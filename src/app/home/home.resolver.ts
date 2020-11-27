import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../core/user.service';

@Injectable()
export class HomeResolver implements Resolve<string> {

  constructor(public userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Promise<string> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        resolve(res.uid)
      }, err => {
        this.router.navigate(['/login']);
        return reject(err);
      })
    })
  }
}