import { Component } from '@angular/core';
import { ServiceService } from '../../Service/service.service';
import { Router } from '@angular/router';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgxDatatableModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {


  rows:any =[];
  public ColumnMode = ColumnMode;
  public basicSelectedOption: number = 10;
  constructor(private service:ServiceService,private router: Router){
    this.getData();
  }

  getData(){
    this.service.getallparty().subscribe(res=>{
      this.rows = res;
    })
  }


  addParty(){
    this.router.navigate([`pages/parties/create`]);

  }
 
    
  clickOn(row:any,action:any){
    this.router.navigate([`pages/parties/view/${row.id}/${action}`]);

  }

 }
