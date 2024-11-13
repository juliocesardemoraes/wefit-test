import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // F ou J(física ou juridica)
  @Column({ type: "varchar", length: 1 })
  tipoPessoa: string;

  // V ou C(vendedor ou comprador)
  @Column({ type: "varchar", length: 1 })
  tipoUsuario: string;

  @Column({ type: "varchar", unique: true })
  cnpj: string;

  @Column({ type: "varchar", unique: true })
  cpf: string;

  @Column({ type: "varchar" })
  nome: string;

  @Column({ type: "varchar", nullable: true })
  celular: string;

  @Column({ type: "varchar", nullable: true })
  telefone: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  cep: string;

  @Column({ type: "varchar" })
  logradouro: string;

  @Column({ type: "varchar" })
  numero: string;

  @Column({ type: "varchar", nullable: true })
  complemento: string;

  @Column({ type: "varchar" })
  cidade: string;

  @Column({ type: "varchar" })
  bairro: string;

  @Column({ type: "varchar" })
  estado: string;
}
