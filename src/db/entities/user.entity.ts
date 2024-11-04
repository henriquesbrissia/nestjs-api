import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'user'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;
}
