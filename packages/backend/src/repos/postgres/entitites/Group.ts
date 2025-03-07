import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm'
import { User } from './User'
import { Team } from './Team'
import { Rating } from './Rating';

@Entity('groups')
export class Group {
    @PrimaryGeneratedColumn('uuid')
    group_id: string

    @Column({ type: 'text', nullable: true })
    description: string;
    
    @Column({ type: 'text', unique: true, nullable: false })
    group_name: string

    @Column({ type: 'boolean', nullable: false, default: false })
    canRequestFeatures: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    canRequestHotfix: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    canRateAnalise: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    mustRateAnalise: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    canRateAnalinhamento: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    mustRateAnalinhamento: boolean

    @ManyToOne(() => Team, (team) => team.groups)
    @JoinColumn({ name: 'team_id' })
    team: Team

    @OneToMany(() => User, (user) => user.group)
    users: User[]

    @OneToMany(() => Rating, (rating) => rating.targetGroup)
    ratings: Rating[]
}
