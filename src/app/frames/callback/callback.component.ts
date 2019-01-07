import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LoadingSpinnerComponent } from 'src/app/frames/loading-spinner/loading-spinner.component';
import { Overlay, OverlayRef} from '@angular/cdk/overlay';
import { ComponentPortal} from '@angular/cdk/portal';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { VocabularyRestService } from 'src/app/services/vocabulary-rest.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnDestroy {
  finished: boolean = false;
  overlayRef:OverlayRef;

  constructor(private overlay: Overlay, private router: Router, private vocRest: VocabularyRestService, private route: ActivatedRoute, private changeDetector: ChangeDetectorRef) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.onInit();
      }
    });
  }
  onInit() {
    setTimeout(() => {
      this.overlayRef = this.overlay.create({height: '100%', width: '100%'});
      const userProfilePortal = new ComponentPortal(LoadingSpinnerComponent);
      this.overlayRef.attach(userProfilePortal);
    });

    //finished = true => internal call from auth.service.ts
    this.route.queryParams.subscribe(params => {
      this.finished = (params['finished'] == 'true');
    });

    if(this.finished) {
      this.vocRest.handleServiceStart();
    }
  }

  ngOnDestroy() {
    this.overlayRef.dispose();
  }
}
