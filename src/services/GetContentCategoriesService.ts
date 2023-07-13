import { ContentCategories } from './../repositories/mock/contentCategories'
import { ContentCategory } from '@models/ContentCaregory'

export class GetContentCategoriesService {
  async execute(
    params: Partial<ContentCategory>
  ): Promise<ContentCategory[] | Error> {
    const contentCategories = ContentCategories.filter((item) => {
      for (const key in params) {
        if (!item[key].includes(params[key])) {
          return false
        }
      }
      return true
    })
    return contentCategories
  }
}
