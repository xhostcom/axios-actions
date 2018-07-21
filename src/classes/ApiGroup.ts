import Api from './Api'
import ActionMap from '../services/ActionMap'

/**
 * Group class
 *
 * Manages related URLs of an API
 */
export default class ApiGroup extends Api {

  /**
   * A map of API endpoints
   */
  map: ActionMap

  /**
   * Endpoint constructor
   *
   * @param   axios       An Axios instance
   * @param   actions     An optional hash of paths
   */
  constructor (axios: any, actions: any = null) {
    super(axios)
    this.map = new ActionMap(actions)
  }

  /**
   * Call a specific action
   *
   * @param   name      The name of the action to execute
   * @param   data      An optional hash of data to pass to the server
   * @returns {Promise<any>}
   */
  call (name, data) {
    const action = this.map.get(name)
    return this.request(action.verb, action.path, data)
  }
}
