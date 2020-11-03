import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LoadingSpinnerComponent } from 'src/app/frames/loading-spinner/loading-spinner.component';
import { Overlay} from '@angular/cdk/overlay';
import { ComponentPortal} from '@angular/cdk/portal';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { VocabularyRestService } from 'src/app/services/vocabulary-rest.service';

@Component({
  selector: 'app-login-succesful',
  templateUrl: './login-succesful.component.html',
  styleUrls: ['./login-succesful.component.css']
})
export class LoginSuccessfulComponent {
  private overlayRef;

  constructor(private overlay: Overlay, private router: Router, private vocRest: VocabularyRestService) {
    this.onInit();
  }

  onInit() {
      setTimeout(() => {
        this.overlayRef = this.overlay.create({height: '100%', width: '100%'});
        const userProfilePortal = new ComponentPortal(LoadingSpinnerComponent);
        this.overlayRef.attach(userProfilePortal);
      });
      let _this = this
      this.vocRest.handleServiceStart().finally(function () {
        console.log("REMOVE LOADING SPINNER");
        _this.overlayRef.dispose();
        _this.overlayRef = null;
        _this.router.navigate(["../"])
      })
  }
}
