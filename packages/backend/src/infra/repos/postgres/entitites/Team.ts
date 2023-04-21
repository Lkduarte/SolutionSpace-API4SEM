import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { User } from './User'
import { Group } from './Group'

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  team_id: string

  @Column({ type: 'text', unique: true, nullable: false })
  team_name: string

  @OneToMany(() => User, (user) => user.team)
  users: User[]

  @OneToMany(() => Group, (group) => group.team)
  groups: Group[]
}
