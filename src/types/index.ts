export interface User {
  id?: string;
  nome: string;
  email: string;
  telefone: number;
  senha: string;
}

export interface List {
  id?: string;
  produto: string;
  foto: string;
  disponivel: boolean;
  //status: "OPEN" | "PURCHASED" | "IN_PROCESS" | "FINISHED";
}

export interface Auth {
  telefone: number;
  senha: string;
}

export interface UpList {
  status: "OPEN" | "PURCHASED" | "ON_PROCESS" | "FINISHED";
  disponivel: boolean;
}

export interface Faq {
  id?: string;
  pergunta: string;
  resposta: string;
}

export interface ChangePassword {
  password: string;
  newPassword: string;
}

export interface Mail {
  to: string;
  link: string;
}
