import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FavoriteItem } from "./FavoriteItem";

@Entity("ingredient")
export class Ingredient {
  @PrimaryGeneratedColumn()
  id_ingredient?: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column()
  unit: string;

  @ManyToOne(() => FavoriteItem, (item) => item.ingredients)
  item?: FavoriteItem;
}
