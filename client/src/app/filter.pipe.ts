import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(users: any, term: any, status: any): any {
    if (term != undefined) {
      users = users.filter(function (user) {
        return user.username.toLowerCase().includes(term.toLowerCase())
      });
    }
    if (status === undefined) {
      return users
    } else {
      return users.filter(function (user) {
        if (user.status) {
          return user.status.toLowerCase().includes(status.name.toLowerCase())
        } else {
          return null
        }
      });
    }  
  }

}
