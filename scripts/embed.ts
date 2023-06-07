import { PGPatents, PGJSON } from "@/types";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import fetch from "node-fetch"

loadEnvConfig("");

const generateEmbeddings = async (patents: PGPatents[]) => {

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  for (let i = 0; i < patents.length; i++) {
  // for (let i = 0; i < 1; i++) {
    const section = patents[i];

    const { doc_id, title, reg_no, content } = section;

    const res = await fetch("http://1.226.137.77:4004/embeddings", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        query: content
      })
    });

    const responseData = await res.json();
    // console.log(content);

    // const [{ embedding }] = responseData.embedding;
    const embedding = responseData.embedding;
    // console.log(embedding);

    const { data, error } = await supabase
      .from("patent_sample")
      .insert({
        doc_id,
        title,
        reg_no,
        content,
        embedding
      })
      .select("*");

    if (error) {
      console.log("error", error);
    } else {
      console.log("saved", i);
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }
};

(async () => {
  const patents: PGJSON = JSON.parse(fs.readFileSync("scripts/patent_sample_cut.json", "utf8"));

  await generateEmbeddings(patents.data);
})();
