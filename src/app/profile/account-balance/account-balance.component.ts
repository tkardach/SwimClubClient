import { Component, OnInit, Input } from '@angular/core';
import { UserProfile, Fees, FeePair, AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.css']
})
export class AccountBalanceComponent implements OnInit {
  private _profile : UserProfile;
  @Input() set profile (prof: UserProfile) {
    this._profile = prof;
    this.calculateFees();
  }
  get profile() : UserProfile {
    return this._profile;
  }

  totalFeesOwed: string;
  feesArray: Array<FeePair>;

  constructor(private authService: AuthenticationService) { 
    this.profile = {
      user: {
        lastName: "Test",
        certificateNumber: "12"
      },
      events: [],
      fees: {
        totalOwed: '',
        startupFee: '',
        equityShare: '',
        unpaidCarryOver: '',
        membershipDues: '',
        lateFee: '',
        workdayFee: '',
        guestFee: '',
        nannyFee: '',
        assessmentFee: ''
      }
    }

    this.calculateFees();
  }

  ngOnInit(): void {
  }

  calculateFees() {
    this.feesArray = [];

    if (!this.profile || !this.profile.fees) return;
    
    this.feesArray = this.authService.convertFeesToArray(this.profile.fees);

    this.feesArray = this.feesArray.filter((item) => {
      return item.name !== 'Total Owed';
    });

    this.totalFeesOwed = this.profile.fees.totalOwed;
  }
}
