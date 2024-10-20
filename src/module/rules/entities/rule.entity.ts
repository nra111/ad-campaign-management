import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class rule_master {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    condition: string; // e.g., {"spend": "> 100"}

    @Column()
    action: string; // e.g., "pause_campaign"

    @Column({ default: true })
    is_active: boolean;
  
    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deleted_at: Date;
  
    @Column({ default: 0 })
    created_by: number;
  
    @Column({ default: 0 })
    updated_by: number;
  
    @CreateDateColumn({
      default: () => `timezone('UTC', now())`,
      type: 'timestamp with time zone',
      name: 'created_at',
    })
    public created_at: Date;
  
    @UpdateDateColumn({
      default: () => `timezone('UTC', now())`,
      type: 'timestamp with time zone',
      name: 'updated_at',
    })
    public updated_at: Date;
  }