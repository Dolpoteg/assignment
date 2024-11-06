import { IOfficeRepository } from '../infra/interfaces'
import { officeRepository } from '../infra/office.repository'
import { Office } from '../types/types'

export class OfficeService {
  private officeRepository: IOfficeRepository

  constructor() {
    this.officeRepository = officeRepository()
  }

  async getOfficeById(id: number): Promise<Office | undefined> {
    return this.officeRepository.findById(id)
  }

  async getAllOffices(): Promise<Office[]> {
    return this.officeRepository.findAll()
  }
}
