// Angular Imports
import { Injectable } from '@angular/core';
// Libraries
import {
  ApiService,
  AuthPostEndpointsC,
  PropertyGetEndpointsC,
  PropertyPostEndpointsC,
} from '@library';

@Injectable({ providedIn: 'root' })
export class EndpointsService extends ApiService {
  public readonly _endpointC = {
    auth: {
      post: AuthPostEndpointsC,
    },
    properties: {
      get: PropertyGetEndpointsC,
      post: PropertyPostEndpointsC,
    },
  };
}
