import ApiGroup from './ApiGroup'
import { isObject } from '../utils/object'

/**
 * Endpoint class
 *
 * Manages browse and CRUD calls for a specific endpoint
 */
export default class ApiEndpoint extends ApiGroup {

  /**
   * Endpoint constructor
   *
   * - inherits all API methods
   * - inherits all CRUD operations + browse
   * - supports REST or object configuration
   * - optionally returns data rather than response
   * - optionally maps keys to and from the server
   *
   * @param   axios       An Axios instance
   * @param   config      A single RESTful URL or map of URLs for create, read, update, delete
   * @param   optimize    An optional flag to return the data rather than the response
   * @param   map         An optional map to re-key objects on send and receive
   */
  constructor (axios: any, config: string | object) {
    super(axios)

    // normal
    let actions = config
    let verbs = {
      read: 'get',
      browse: 'get',
      create: 'post',
      update: 'post',
      delete: 'post'
    }

    // rest
    if (typeof config === 'string') {
      verbs = {
        read: 'get',
        browse: 'get',
        create: 'post',
        update: 'patch',
        delete: 'delete'
      }
      actions = Object
        .keys(verbs)
        .reduce((output, action) => {
          output[action] = config
          return output
        }, {})
    }

    // add actions
    Object
      .keys(actions)
      .map(action => {
        this.map.add(action, actions[action], verbs[action])
      })
  }

  /**
   * Browse the resource index
   * @param   data
   */
  index (data?: any): Promise<any> {
    return this.call('browse', data)
  }

  /**
   * Create a new resource
   * @param   data
   */
  create (data: any): Promise<any> {
    if (!isObject(data)) {
      throw new Error('Missing data parameter')
    }
    return this.call('create', data)
  }

  /**
   * Read a single resource
   * @param   id
   */
  read (id: any): Promise<any> {
    if (typeof id === 'undefined') {
      throw new Error('Missing id parameter')
    }
    return this.call('read', id)
  }

  /**
   * Update the resource
   * @param   data
   */
  update (data: any): Promise<any> {
    if (!isObject(data)) {
      throw new Error('Missing data parameter')
    }
    return this.call('update', data)
  }

  /**
   * Delete the resource
   * @param   id
   */
  delete (id: any): Promise<any> {
    if (typeof id === 'undefined') {
      throw new Error('Missing id parameter')
    }
    return this.call('delete', id)
  }
}
