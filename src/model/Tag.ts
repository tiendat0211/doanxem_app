import { Tag } from "./SearchResponse"


export const TAG_COMPARATOR = (tag1: Tag, tag2: Tag) => {
  return tag1.id === tag2.id
}

