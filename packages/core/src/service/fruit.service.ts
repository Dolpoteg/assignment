import { fruitRepository } from '../infra/fruit.repository'
import { IFruitRepository } from '../infra/interfaces'
import { Fruit } from '../types/types'

export class FruitService {
  private fruitRepository: IFruitRepository

  constructor() {
    this.fruitRepository = fruitRepository()
  }

  async getFruitById(id: number): Promise<Fruit | undefined> {
    return this.fruitRepository.findById(id)
  }

  async getAllFruit(): Promise<Fruit[]> {
    return this.fruitRepository.findAll()
  }

  async getKcalMap(): Promise<Map<number, number>> {
    const fruits: Fruit[] = (await this.getAllFruit()) || []
    return new Map(fruits.map(fruit => [fruit.id, fruit.kcal]))
  }
}
