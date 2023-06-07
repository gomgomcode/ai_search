export type PGPatents = {
  doc_id: string;
  title: string;
  reg_no: string;
  content: string;
  embedding: number[];
};

export type PGJSON = {
  data: PGPatents[];
};
