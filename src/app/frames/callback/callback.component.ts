import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerComponent } from 'src/app/frames/loading-spinner/loading-spinner.component';
import { Overlay} from '@angular/cdk/overlay';
import { ComponentPortal} from '@angular/cdk/portal';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private overlay: Overlay, private auth: AuthService) { }

  ngOnInit() {
    let overlayRef;
    console.log("1", this.auth.isAuthenticated());

    setTimeout(() => {
      overlayRef = this.overlay.create({height: '100%', width: '100%'});
      const userProfilePortal = new ComponentPortal(LoadingSpinnerComponent);
      overlayRef.attach(userProfilePortal);
      console.log("2", this.auth.isAuthenticated());
    });
    console.log("3", this.auth.isAuthenticated());

    
  }

}
