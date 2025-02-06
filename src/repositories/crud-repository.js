const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require("../utils/errors/app-error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the Crud Repo : create");
      throw error;
    }
  }
  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: {
          id: data,
        },
      });
      if(!response){
        throw new AppError('Not able to Find the resource', StatusCodes.NOT_FOUND)
      }
      return response;
    } catch (error) {
      Logger.error("Something went wrong in Crud Repo: destroy");
      throw error;
    }
  }
  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      if (!response) {
        throw new AppError(
          "Not able to find the resource",
          StatusCodes.NOT_FOUND
        );
      }
      return response;
    } catch (error) {
      Logger.error("Something went wrong in Crud Repo: get");
      throw error;
    }
  }
  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      Logger.error("Something went wrong in Crud Repo: getAll");
      throw error;
    }
  }
  async update(id,data) {
    try {
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      const available = await this.model.findByPk(id,{
        where:{
          id:id,
        }
      })
      if(!available){
        throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
      }
      return response;
    } catch (error) {
      Logger.error("Something went wrong in Crud Repo: update");
      throw error;
    }
  }
}
module.exports = CrudRepository;
