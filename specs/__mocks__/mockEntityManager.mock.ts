import { EntityManager } from "typeorm"

interface mockManagerArgs {
    saveReturn?: object | [object], //não obrigatório
    findOneReturn?: object
}

export const getMockEntityManager = async({
  saveReturn = undefined,  
  findOneReturn = undefined
}:mockManagerArgs): Promise<EntityManager>  => {
    const manager: Partial<EntityManager> = {}

    manager.save = jest.fn().mockImplementation(() => Promise.resolve(saveReturn)) //a forma q a gente mocka uma a chamada de uma função dentro de um jest alem deisso podemos mockar o retorno
  manager.findOne = jest.fn().mockImplementation(() => Promise.resolve(findOneReturn))
    return manager as EntityManager; // vai valer como
}