// Angular Imports
import { Injectable } from '@angular/core';
// Library
import {
  ApiService,
  AuthPostEndpointsC,
  UploadPostEndpointsC,
  PropertyGetEndpointsC,
  PropertyPostEndpointsC,
  PropertyPatchEndpointsC,
  PropertyDeleteEndpointsC,
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
      patch: PropertyPatchEndpointsC,
      delete: PropertyDeleteEndpointsC,
    },
    uploads: {
      post: UploadPostEndpointsC,
    },
  };
}
