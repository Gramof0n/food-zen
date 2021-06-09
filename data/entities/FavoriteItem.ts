import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ingredient } from "./Ingredient";

@Entity("favorite_item")
export class FavoriteItem {
  @PrimaryGeneratedColumn()
  id_favorite?: number;

  @Column({ nullable: true })
  item_id?: number;

  @Column()
  title: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.item, {
    cascade: true,
  })
  ingredients: Ingredient[];

  @Column()
  instructions: string;
}
