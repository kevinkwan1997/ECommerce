import { Item } from "./models/item";

export interface AppState {
    readonly item: Item[],
    readonly favorites: Item[]
}