import { Component, OnInit, Inject } from '@angular/core';

import { HomeService } from './home.service';
import { NotificationService } from './../notification.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  name: string;
  lat: string;
  lng: string;
  desc: string;
  points: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  markers = [];
  errorMsg = null;

  name: string;
  lat: string;
  lng: string;
  desc: string;
  points: number;

  public markersInputToChild: Array<any>;

  constructor(
    public dialog: MatDialog,
    private homeServce: HomeService,
  ) {
  }

  ngOnInit(): void {
    this.homeServce.taskCreated.subscribe((data) => {
      console.log('TASK IS');
      console.log(data);
      this.markers.push({ latitude: data.lat, longitude: data.lng, img: data.img, name: data.name });
      this.markersInputToChild = this.markers;
    });
  }

  isEmptyObject(obj): boolean {
    return obj && Object.keys(obj).length === 0;
  }

  openTaskDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialog, {
      width: '500px',
      data: { name: this.name, lat: this.lat, lng: this.lng, desc: this.desc, points: this.points }
    });
  }
}

@Component({
  selector: 'create-task-dialog',
  templateUrl: 'create-task-dialog.html',
})
export class CreateTaskDialog {

  constructor(
    public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private notifyService: NotificationService,
    private homeService: HomeService,
  ) { }

  createTask(data): void {
    const img = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoGCBUVExcVFRYYGBcZGh8aGxoaGiEcHRobIxwfHyAgHxsmISsjGyMoIBkZJTUkKCwuMjIyHSE3PDcwOysxMi4BCwsLDw4PGRERHDEoHygxMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAKIBNwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAACBQEGB//EAD4QAAIBAgQEBAQEBgEDBAMBAAECEQMhABIxQQQFIlETYXGBBjKRoUKxwfAjUmLR4fEUBxUzJHKCwlOysxb/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAIBEBAQEAAgICAwEAAAAAAAAAAAERAiESQQMxUWGBE//aAAwDAQACEQMRAD8AyavMK7WWnA9h9dfvgS8HxD3ML9z/AGx6mrwiUz1FRpMS0e4sDr9scq1KCqRUqSMugUKTYmNbkgG3lp24f7T13/HXwvt5un8PuYLs5k+n2kfacOcL8NID1ZZ3i/vofpONQcfTRRFMkDQ5rT2gEBY2n74nEcxcspRVXK2yxaBcm9vPF8+d+uJ48Z913hOTIgshI2MHzOpwzS4RQskpla3W4gjTQfkd8JPxVRozs5kTaw9spsfvbC9DhTHTmvNyWBuZjUGIJ1m8W7vH5L92Q3hGzXrU0E59pYIh0t5a+WA1eNS2Xr8yTpM2AMaXkTMHC9PlxY6CdNYJg97m3f09cPU+SA2c6iPm0F9vU+eE+K37tL8n4gX/AHE5SAqACLRc66WMWi8YAvEVHMtLEaQIgXjfXzF/uMbfDcpQSSZvvYg9/vPvh2jwiJsBB79z/nGuPw8J6S/JyrztGk7WK23sbz32bSf0vhuny4m0eU6fp98bruo/cfvXAW4gEwDfyx0nGRjSVPlgmWMH97f2wzS4GmP7Yv4nYfv2xFBi9vXbGkXhV0j1t/vHRWE2+v03wEkEjf62/QY6UJBiATabz9LR+7YAviM2gPt/nAXqxq31In/OLOqaHvv+X3wFOJQTYdxbKNtJidReSPtgOqw03iZiP94q1UAawPv7T/bClbmSkEKynpawYRIEmWva4vsDpriqcIzglihOzEnT0+2AJU4pIuZ2k3HvGn+sdo8TJEBgJIMQJ9tY9hphbiKtKkGzVASqk5RlBN4Mzp9td8Ep1C8ClSIzCQTMTY9r23E6HtiC9Wsewi20jvM6xF7Db1xMuQnNUVbSMp/va8iBgJ4iqIhvEJJ6VIUFREyy0yTcwtoIIudcG4TltR2zGkEM/OS0yOkyNWtI1/q2GAV/5VMENLExInpXLa4g5bes7Wk4iFmklelpIysDPTECDJteRfp9MbbfDSMVLMRckmNVIjJlOgAIvAut9SDs8LwVOnov2F7z74Dy/AcE5BZKIp5gZMX3vA6rwNbGNMavC8jOrsPQAj6jNb76zrjamLR+/piEYAFHgkTb3/z64JHa2JCi8z7zij1JxUdYYCxAx0idMDEWM29foR+98Bwn2xUMPbHargbmcI8RxSgSJm34C1pAOkRvfQanTBTlSoBhZuKF5Ol8ZfGcwprcj+VY0MkwNTF52xmPx1EAkghSTMrmEkzJN4mSbwB5Yg1eK5qqhCFu2gggxqQenpgRYxe2Fq3MnJCgXym4iNibFhOw9xfGfQpyKggsXjqWwIgaEQLdIyzM/ivZipRZoK06hbMIA3GcAmWOUDXWDGnmAqiksaYZszAtMCFAYWDRAvMKZN2jfExucNwSUkzzC2jqgKCNBawviYDxQpMTFzYa2BAM7QRNtMG4Xl8kjKZaJtpE3vqBIgkfecenpcKqyVUXGlzp2Om5/YwWmQBEbaWvh4rrDo8neDJ8pMX8ridP3vhvh+UAz1bTA+17fv1xohoEbaCe3b9zjuewJBtpi4mg0OW01E5RfX13nDa0kGg+n7vgKVT9v5fXTbtjoJ0IkHXb7HAMF1Hf9+WJ4qxYGP8AX98AsD5kfu3tiB0kAET++2CD52P5eo9NDjlSm2pYz3OBO7AdKg3g3i3f2mb9sVqVLZnJIBPyzeB+xJi4wBQsC5+35f4x2kZiAYN/32wCrxIUzl6tFmBmnQZpMSV+4wDjOIYgDJ0sYJJKxtrIIkxp9sFO1HImWt2Ak/5+mAVOMpKZLWAuYkf4/wAHCFTijK5y6ltBAm2ukzOk6R2tLRCiCOqfyuZki4E4gJU4moTApmL9dhHtPbAc7figGTCyOoiYvpByyNIwsOOQKHYETmIhWNpgwbAgwt/e+Mk84qZ6j0xKRYAHpnqJtKvJvrp63auPQnLebgMCJjXQZTYbCDIue+M6pxVP+rMJAWmyxMiMsTmAjcbQBeMZnE0K5LGoKhAiSFJmRGyZYuN9hqIOKUVAtlIJSBoSSIJYLl10aALdxiaY1xxZc+GlN0YZzLoYsRJJJW+ViIvdtIFzcRwcwXrOwIAIBgTJJPzADQgTfq8gMZnA8ItRhNR5JlfEE9MjeTsD0gjQY9ZynlOVQQoWIB6ZG8wJt8xuZ1Pe4ZPA8taoJUEAKfmgzDGG1JB1J0nMTe2NHgeROcrVarMRD/LEGAImYnygY3eH4NVsFA7wIB/v798OJTOLiEuG5cirECPa/wBu+GaRMkRYbyLm8iJm1vrgmm+BPWUfixQYKdT+/bFWI74Tq8Rff6YoGPngGG4gbY5mJwMJ2udhO/rgdDjM6yFcDMVuMpBUkTBglTlMEayNjgGQtrxhfi6pUSqhokteCAFJsL5iTAi2s7QaVKhM7fvYYzzXp0wAqGGqGZkiSSzNN4BuRtcC04BzOWCvmZdCVMQOk2Pue+2BFzfMZWwEWI1BvYdogYyeYfENMHKjKKkMRmBygrFiwsuojyNpwtS+IaRZkd1LKM65G+ZYBgTYm8Edo7xiDYNcCQSTftETNhAvFvtjN5jxxVoBEknKF/FfqnS4O1/rYZnHfEOoVFzQpVWcCJmYOhNlHqw88KUq9Rz4WXIpu3hqDckGDBm41gggH3DVxbiqtR8hFamzz/4yBsAHAhyRcwTJja18OcNwiVWhqSsJtCLBMTIuc1ibwNCNcW4Hk4C/xAgWLSSpRcsfNJKwusHGu3CVFRDReT4iEkGOjNLdTK2YRoBE9xggVTl5qKUaAwUHqpkrM5QbWN/wzPmJnGpRRVGTqMdxA0AtoD7bn2xYVCItttYe3l/bzxcsDIuCBPSoJH2jbFFkoCZInWJMa30mNvPHMVBBB2g7g/oPPEwGC9UmYkEf7uD3xbOT8xEfn6+2BqADYC0naPfz1+mLPWG0Am3cE9tr74IKF7En8tPQ/XBQigXt5bn1MYzzxqBhTepDN1ABfwjWDBBuYG+F+I5xQQNFQMZNlClswiYW19b+XlgrWzrNoj009/3OB0qhMiDZoMKVG2haM4vqJ0I2xgf98U1QQCJgINwpGZjFiCTlWIJ6RFzGFm4viahqModaSqRnQyWgluimSe8ZrH0AjDTHpqgBJVmv80awJuZuNbYg4oCyAlmEA2A09u423GPM8t4jPWpqrl7F2EIz5InLAgUyZViI73kxjXpc04RGKmuhJH85YMZYWaTNyRANjsMTTDnHJUqoAIEQTJMGCCQYixiNh5RbAOD5OVqmoTLwQusBSZIiYkmJtJIHbGJX+KlNU+AhcFB/EMgGAYAB0gkglu47XlT4gqMAkfhBJUSbCZBIClgV0HcaYWyLjdoVGAZnGSCVVRULKwLQpmBDHTKL6C9sZf8A/o2hg1OI+TxWIawsxB0MzcEmBNzbGVT4x3IcsSzkCytbQk2AzSCLQu4uNOeC7jLEqWEDU+YVQCwOne3rjN5LI0DzSqVs2eIhwFETAa1mJBnQa6gCDgA4mpVlqjVAPMgBLH8EDtE7kE9wRU6SAZ3mCsAEiWjQLAIIMiASRPoItwiU6kZlkZjEIJIGU6AXa6m3b6TVdR1aAwB+aC2Y/iYfL+ECJiPrcA/h0UMio1oZjAlmk51yliykALcEmSdMb3JvhoVEmrnuQTLL1rrmnKYOkx9dseg4DkHD0jmCyfMk2IgzJv8Av3sia89yHlZYZkrOqgADMoKyGkWOh6rkG+aL49DT4ILZmLwZmMpIgC5GsR5DTDnF8LTqU/DKArYwdAVIZbeRAOBkkABiCRqQIExeBt6Y0zq1BSpEaC0ad8MDiTsB9Zwka0dsCfiCdv36Yo0jxZ8hharx0WnCWZsXp05wBTWY/sYlMHBUpj9jHTbtAjuT54CIBrM47TqKZF+kxoRsD766i2o1nFCbksoF4BBkkedrXJtf74q8amPQeuAJVqgjW/lM/wCsICqytDQxJJBH8vnN7WnbTFH4lgLjaw200Ppsd74zOP46PmaF3LEwCdvM300+2Ac4vjmbJ4bKqhgagZZzJBEDsZIv5RGEalao5GVgIk5P/jAzNMQCWmAb5TtgZJAGoGq2JG29p9Jj6Yz6GajXbKHdKgLZSBlVpFlYtmFsxywR/wDaAdPk9Rqn8VkemBOWWzZrkzAHfW4MC2L8DySmgXMi9ypysFzAggOVDdvoPPBuMKStIhElugMJDACXC2tKk9jc+ca/LOHIUGoVzAGcogwSYAuY8x37aYKXocvFgMsCBB/CQAvzHeALx+eNLgqADAQxMEyRKxa1haDpe8+WDoh0yghTF5W3cWjX/eCVnADJtowIBDAjeRexjT9cVE4qgIKOM6wRlNgwMyGBkNNtrXPpTha1MDw6dPKKaqIVYCiIUAxlIgH0jTFysyB8xG8dvWNvy74TSi0BWzq1tGAJvfUCddY3wDlNyTlvIj+o3mPXbvgaIi5gAqFjLAQJaBdoF9vp5Yn/ACYkAdQuRMxIFp23074FTQic8GP7XvubncajAEqcUY2W8dptO/l5bnHcImmCwOWGIgmbge+un3xzAY9PmEsFSmWnvYKRNjuDH4dI3wvwNHxVk0lQ2GUqQAwzAwIBKw/4tdcowkPiRnFNQpZmYNAAAcCWyDMQQ0BTpe/y7JHn4z1QOkswK5MkhVJILGOstAUox/ERrGJq42K/w+XaMyMYnKygCwChgAREdMx2nXFKXw9UXM4ZoUFgBPUWU2ALDTp+a3lvher8UEoxbLVYm1MtlEQSArKDmBEgyWBynY4yTx9QsXNSoqGPDRPlEQAB8sZQoGUkH5pnE2GNLjOL4annpm7R4ebLczGYMxnWAIgnpOFeL58GM3QEqAQHaAvUP4YXKCSGMnawwhys55AqSXYuKaZR/EzDVUNzl6gAAZaLwcdThlJKtUglRnCqCpZgDJGU5LyLgAX7RiaolHmFRjTeZm3hD+GoQZgTlCEzmM3ES21sDrSMpQgQg8RR0wSzZwARLHqQfMNTEiCDVeGMuhq08uaTUy9gD1nMJaJ2gaWmMcSi+irVLLdQMxRgTlGUwRBkEspYmRIwHOCMkyXsZ+VhLWAS3TYqWzRJkg6jB6JuRTCKDIdlJUQSTJEhDF5sNSYIAxo8DyepU6BkDC5Q0/DZ0ZllixljAImYg2iQI0uWfCDFmFeoVykBGSIeVUlgpmIbMBeRAPeZIaxUohkVahaB/NLLoZCxmuBL3bc7aW4HkNWo7MlF2BEA1DkUDSQDsBpHVEa3n3PLfh2hSc1BnZr9TuWF4/CemRAvrc9zOszCIONTimvIcl+F6hfxK7KCR1U4VrXEFiuvnrpe1/V8NRp0RFKki6AhFC2iJPePrizVYgj9++A1eKgWxUM0XqeGniBQ+UFgp6Q0dQUwDEyBvGBtxAG/rf8AXCNTiCdPv3wKxi5O8g2/WBihh6vVmEyRGuwJP6nFDUJ/xgaAzABManFwQSAL31ItaDNxf5hcefY4CF5YKTDGSB5CJ28x9cHWhHl6fs4oW11B8t/77Y7mWVJubgeZ09JtgCKgiPrpe2C0xA0EAfu2FXqeizsYkj/Q0tr7YFU4oGBE+x9//aPM4B16sg6i3Y/n9cAfiJtptIP0I9MI8XxKr+KNYFidffcycIVeNBIUAFvm2iO/kJ374g0OGYUkCCo7ACM1RizEidWNza2vbCvE8VUkkFSkDTWSb3iICgRa/lrhCpmHzgkGVBlRmm1gTckkRMyfXA2Wu1UhaYWmFLq5PWKgkWBUqJACnyJ72aC1uId+lGIOUmRIsJFjlicxWxjv6jodCwyGoyhQSAGZlsJPy+4Emx1kYdokNAdWMjNNoBUyVJDBVBziN2HkMLcPQUVCQklhkL5buqyFZrmFkQNfm0GCrjlzVFFQC4bMAxYxOkqpA0No27Yb4DktVWpsCCgXKacMRrrlkRBvM6WnTDXB8sZTnZwVMsIsVjLowg5V6yJzGW10GGuC5jTd6uoyPkLMPmtJyf0j9MAtwPCOhHTmZic0DLlG1jqNht1TsIeoFIFSx6p0INpUwNiOqRrscJ1+NavRdKLXLPTNVABkIJkgMTMQVt+LyBilDmDGlALl16SVpnMWsMzALlWZDRoRNoBghrjaxsJGZmhR4ZcCFJGYqTlWVmbagTJnAqjvoysbEbjNABEywj8S2m8dQ0wpwlMAhFSPCYxMhZJnTRSyvMwYnbTBxXUFVytJuWAmwIGkzLEsZA+mAJwqBBCmw38TNtElj1NOUQJJwJuJgliVuwUEnUk98wmSY/LBXqByAB9iRttPYg4rxfQskI0EGGKgliY1YiDewO5jtigj1YAAKljcIxADAHqIBGwMx5jTAXrhiAIK63i+47baeX2px70wVlGZwDlsTExJB9DH+DcNbioIKoWkEkAjMSCAQNiR+YIm2Au3EIrZA6BwCwEicsgHp2AzKLjcYmM/iuZZTkAJaAWgFkE32B+pAxzEHhaVNAAVzK65jUzJcXIhgSAFjdQQNzcEnpDxKYLDLZhAyFDlkyyqpIIizNJ1vcg7fLuUM9VqDDL4ah2KNKlmurRmkHpusQb7Wwfl/JFaatOo6iGpEKDTzZSLEk5uogX0NjbfOVrYwqLdMMqBRKJsSW1NgGEiLgEmfoThkJzeILaGFgqskaFiVS9gSf1G9y3lQqTnNVCApZGMMucGAKigTlIBzSd5w3ynkreK4r0+GNKIRVSW1F2drtufXvh4nk85wyOoApgQvUpKQpUAwyENECWPltIjG/yGg3jBTSU0ggNRjTdW8U9XTMKy5TMiYNrY3Up00uFICg2U2adcyizWVYnziNzUatjCxe0xeb+wkn+2NSJaBwvLwjEotNVYSyhQDm82gSBcDvODf9qo51d0VmUZVm4UXsE+Ua6gSYE6YtxALWtAIM31BBFvUfvTAaXHIxdVaWRgrf0mJ31sZt3HtUaFSr6fv/eKjiQRb++/98KtWAMCCYk6flhfN6bx5T28sEaIq7yY088L/wDIP+v9fbCrvGsn9+n644HJixIntb31kemCjs8jv3H+8QgevuMDRiBczf6fb9JjviU+s7iCZBAP3j0a2AIDFyYGv79sECwDYDsf1xVFg7/W39/rGOEgi1u+1/PsfPARzE21+gjsMWUyIJj7dv77eWB51AIvHcaed+/3wI1kmVYE2AH4jE75tJnYYBijXV+pbgSCdbgkRr3F/TCHFV6p8PKoXdlLXUwSY3cTbS4vhxCL2CjdiFvvY4HUZVaQVE2mCT9Trf8APbXECzs/U70hFgc7fhBbUxAAkmDa5mN+1hYEMqC1iMzQZsTsNNIiNcc4zmJzDKuZcwVjJEEkXAiDbzG3cYz6boanWQlR1KimzFjkVuq0wpPX1HsszEAM+l8QFXCMhqFek+FdlIK3YNGUlX01OU+YBOHqiqzQG8Ni3U3UhVjAECz30mQBsASQTn3L6fg1GRTnczU6Ec2AEnNIDKDYnSYGuApxIpNSp0+JluomnkilkNMlBMdDK8WU5juBNop3mVVVQUxCsRCAmNU2WQFIALRPY3g4U5NUdzmpJTyutlYhGzAgEAdQAGadJJYXAImcZ8OM9YErTliCzGSoZQAvUGFR9D0sDcEdjgtTkhpp4lOtkRZLrBVGzAPBFyLfzAgZrKCMA3wNcVGsAtSllzJaaQZWU5tgASYvIiJsRh34eo5f4njeKrkrTXKECsucObBS5JB2MXgXOPC0uYUmaq1R6KrVWmsp1GBZ4yiTO8qLZvf0HDUa9NWC1fFpAkL8qMVABILEHO8WEnLlkSABgPRNXrDiGUOFBXMoAJ8OJGZjmUuG0AI/C3acJ8bzhKaqaoLMUR5CFlOaAAQMwPUdmPkSIx5bmXxDUNdKlNQyCQqsxyssD5wCWDhi0EgZZWxuTanxdapVMJkDrrSj+EQpkq9wTmaSI+kHDRTk6tTyU2rNUem4kOpGRW2cZSzAq89XmJUXHq6FOsarFqieHlBlSQ/iHKSMoNlOYkEsYkdr5nJqNOmiL0sHIJNySbkSG+XLlp9M2AJMbF4w5A803IpQlNFAJdGgAXgQGM65pVTcYo2Vqm0gHuJkgkgKY021i2X3CfL+LFXN/CemFfpJWJg2cWkTY3FpMTri3iZi0h1KjqkQrCDENYHz7EgbWHToLVphlqZVYSGRgZ1HzXGgmx7b4IT5xxVVCAlLMrCAAWaSbXUWYZZNzbWTMYT4LmocCpmiixU9bM+VQGlVgmTJOoMkRYKMOc24OmDTqkgVGcrTFSqacltUlQbwoMGZKjTcHFU/CohIqrnpt0eGRa0K2tNSNDJlr6ixBvlvFK7VUV1qhmBRVphSgP4SJtLButwNTe4xmc045y7IiVBfv26ZJs0wZFz+KdAceboJlaaZqS7ZIpqVXMZWA4IvFuldgIix9DT+HamdnTimWKbMXzwqVQRAMjOVEPJJA6YjE3VA5HRoN/Ceq4qycyLUeFA2JYhlvEwbkDaRiYT4/jTToU0rVg1SWzFszBjMiXzpChdIkG1r5sTEV6wIani+FWqBk6cqinOfKCLlL6/iJHUcanCLIzMGU2BkidJhosdSLdz3wvSyIAqhQNABA0wTxZj9fL8741JjNptXB0776m2OGoBeffYfp7YSqcQqkKWEtMCfm3MCbxivj3E9IXX1tFzfvioYRst8kMx6iImwMEtYnQDc39cU4z+IrJmZZEFlJVhI1VhcG+owOrWMHNPfcfU74qHn6xfUxvP08sAwKgIgkjUbfppgVV53iDqCReIvG0d/0xFvpa/b9N/XHaUXN7G5YRbX7YAma28euK017/nGn3x09RzEkjsLj7DT1xKDGIaG8wIHvfBViDAIF+6/oY/PF1QgmNe/79MSk4t27RH7GK8XxCU1JqsiLuWIUT6nXf6YClfikpoXqOFUC7loFvMnHmuO/wCoHB04CE1W38NSse7wI9Cf1x5L4++IzxTLSphvCQySY63mM3koBt3nHmKfByC2YALEib3Ogt1EDsDiWmPYcb/1GctNOgBAIXPUdhBOrICqk9u3fGPX+NuOc5hUyjslNYHuVJ++w7Y6fhnw0NSo4CrcmCBH3OvYYWXhcwOVHCkCAskSCRDEjad41xO1wpzHmHE1oFapWeYMOzFT6Lp2jCQokQxBA7gbwf7Y9PwfAKGRXF3JCwLEmdCrAiZW19PptU+TirXWgVVXUAsURUWIFySQRqpMrN/MHE0x5DhuIrhJTiW86fiETvGSerXtecG4f4m438NVmAGW6g27TE/eceyf/pzVBzF1A0zQJu20iD0yPmH3gXfkwVlo5mAYkk5VK01URlJWwYgg6d76ytMeXp/GPFqQzojZSD1KVIJ7EEbfSxw/wPxlSesj1qOTLIzqS2UEEG1pEGI8t8emb4VfMSaYMAg5SQQTI3aQp+X3trjznMOSIpDGmgWwJKkiZMy1jdoUCJnUjUNXHpeD5jT4ojwqga0ggHOKkjVbCAL3mbawMWHAViyVUBplOp1BBao0mc4UAPm7yJJk6W+ccbyeMxpnqDQq3BYTqP5fSZE37nU+F/iV6LpSqHNSByqWsUJgEhp+WRMfe2Kj3yVK7LlamobICIZjcE5TFsp6REMToNL4a5XwtQ0UVmvlbsf4jEywLywCmQBcjeYBwanVJh4hNBOjx2AkZSGkaNbeMW5pxTcPSqVFVqjyCKKZQxuAQCEzRMsS0nU6RFGIPhbhBSUVKS0j+MlwZuDeDBkprGhi151W5L0oadRmAbPHiAKxkyCygHKbgbAkGLWa4/hi9MGFmVYM18hzCSuZesrBIkCTAwpRY01y1MpU1AihFk5WfokWMxqwsOwBMEYvL/hmoTUzgpUJBaoUQ0yClkWnc9OciSBJG9sbNPlNOkXqFaVNCqgKARluQZYBekplgDLJLTrONAcP4RCoWhiSUbq+ZixIM6SWkTuNAIxSvQV1daihkKiUYE9MQVAtOYjfAZvAojiqAFeojkiRkAeActNrsBYEte5tpA1W4dVBzRlQaZdAL79u22Mijy4cMGWmEp03Eli5YCoWyqvhRlIvoGG3ttnhcyNTdFynoYAdLWv0aAdRsZwCA4P/ANQCPG6qZUMSGpKVJuFYGGJb5oiJA3GNPh+EyIFzsziCzwoLGIvAFzA09o25/wAMimKUEgJlDEBvKSLA6aDtG9q8Z0JKwDBALkuAY0MvmbQWn3GAvWprYswYg7wItFj7ke/ljz3xhxwQLTFM1DUIyoi6NOrGcsEnT5rkjeD8w5lUKMKZvMZgRKmxgLmk+d7TffFuD4SpTo1KlOoXqvdGdFlBIkGFXODlOuk4Wqt8M8tFGmKtUHxXGbKCwFPsigmFPcgCfTGBzbntSmiU8vghgcqWlb2UjIQTJMiTNrAaa9Tnih2pMwSqoBOYRTbpUnKTEROhuLEyMeZ54zVFWorr0xGarSSQf5qjMHC/MwA1zNfGVL/9+SpVyFgYzWy5hO8IQw22gWJFjGJjz3E584XxFgT/AOGakTFgVsZgTBI6dtMcw8TX1ZeKQmQL/vviv/KFwIGu5vFpjtMYxU4ioFByeWWSxHuCZ3vg9HijEGk+nvr53I85+uNsmzXWZAiZ1G/vEYsKpJggmDMnN9hofe2KJxai5BUaXFgfyxBxVM/Kwvocwg+QgkmJvbAMqZFiAOyg2I1uDca2scEpEmTGabwYA0uQInfzwtQriJJmNoJvtpGLUqxJLW1giNV9jrf89MA4GPn9v18r6/2wQvBI+0T9t9r4Vo8SslZUlYtMkdgbmcXbistlBsRYkzB1udfScEOiLgiO+0/5xEcG0Ej0j/Pb9xhA8XYnNC7CzHb5g0H6HEbmaUxqWMXAmT+bTG2Ci885rS4Wi1SoTCwIUSWbYRoPcj2x8s+LfiV+PZKaU8lNWlQTLE3EsdBabD74t8YfET8a4pqpSmhMKTdjMZm7Hy0E98YScM8lVkMIOWD1G0gRN9D7nTEtU1QpU0c+IxVI+VbsSImG8yNTAvOO8ajOAKSlwOnoDEwYyn5QfmlRPYAA49D/ANN/hscZxBp1KYNMKC7yVKAaZLEEsSBB872jH2v4f+HeH4Om1OiuUOZaTmJtG8iNbAAX73xB8X+GfgvjeNJq1PEphDE15BY3HSCug3MdgL6fRuH+EuCRPBb+JU6WMMykNrJCfIGJJNrzj1FCilIZachdhJIHpJMYo98VGfU5PRzmotGkKkhs+VS2YCA2aJkDfXC3/CqZmaKYZrFz8xF4BAEkCTq2NScLcTwocjMAROhUEflM+mAE/DUgUZqhNRZgK5UEkEQVmG7xFiJAtjM5nwrE0wrIrB8y+IMpAkTkIXrOgPfuLY9PwHChQAoUWgGNvtb0wfiqWYANaDIj/f7tuMB5xuLay1KWbOQgZUzyLyWIXpBB0nv7sPyYEhyz5ogAdIjMDci5Iixt6Y1MoWALQLe2BniDcb7SYH1gxhgV4vknD1Uy8RSSqYHVlCtoLArlIuJ11OPlPxPyDgW4xKPBl2YOvjU2JNOmoIzfxWknYbiWAnbHt/ifgjxXDvS4l/Dcscng1HICnTxEMB5AMyPQjXGL8McspcJQZKTmqS8Ow2eAGygL+ESYMn0wGrXU0aQFOiKhtTFJCoGXSSJ0FpG22Lcsq1Weq1YBApGQK+Y2TqzQPsdARuZxKPEOoJLM6qsKsEOYABlrLmLDU5Vv5TjnEurZvCyZ2UhSygibHKTPVqLTNyRgD0OEXwBTNSqykls5qnN1Fm1ECArGACduwwTJ1ghmEbgyJ1I7DfSPWBio4gBf4ghoBYibG1hAvrpedgb4Tp8zz5AV8OTEVDTzGCbZL2IINiD1aCZIaJmdOub3JN9JvG407/UtNGB6hYXJk6STJt6DLJ98KLMCIkE3CyDNgTBPmIneI3wtxNGojBqdRl6hIqMXQpnzNAgZXiRMmwGA1sgYgm4sRIA3Gh1iLzf9CLjKy01LO4VQJbMYVQNTPYSuveMVHGJUY01KsUClhNxmBIy6EyAfacU47h8y5QzJcAkCSSYIgzEA23OsRAOKGeIdlBFhaZtf6zYWvGPPc25vlMw+Yg5FySdBJaJg66Ab2OJzHmzKrLUAQZisF4DLmhbwLxE/MRjK5bwhaqeJqKtRFBbKxGdaiA5RkAb2IM3uuuJauNb4eoJL1H8WQSo8RMpNwWZFN8phRe/RMC814/jHFRoYshJJJKZKULGWTBvYwRrN9BhOhz0VFh/4VQyTTLQUghbtEG5BzRGxvhTh3d5R0zCIZmpNUXMZBGYBUMXEGD5ds6rH5l8QNRRabv4ro5bMSQ0MDBzqIAUlSAsGRMwIOdxfCDiwahI8WSzE1gWKwCSAwGYyWJkzawAGLcdxaU62U0i0bNUJJMXWFZlBE/8AuFpOF+MrutMBlhHPQFVBEAkLlPyqMxOaB664AlHhKNGsFdgywSHZLyRcZJloIiQSu48uYXyMzgE0l8lckqADAyzHsB54mKj6k/C09ciz3yj84nAqvDUyIywB55QPPti4pki7373X9ZP12xekARHvbf8AvfGkZ7cETZajADWTMHWwaQRjh4CDbwzm1JXee8lSZJ2xpkhZP7n99sUU5h8148/8x9cBjV+W1FEIQdLT27wNBqB52g3wrUarTBlaoyi91ZYmx6pJPl6Y9EWMRB6YJuIP7toMDyRHSsAyDc6/vvgPNcJzio3SeIov2P8A43nzHUsyNIwc81rgQ9Owi9N1afObR5/rj0PEcPTYEVFRxExZliwvJ184xkVeV0cnQComLWvqZMx67fW4JVuMZYYo4Ii05VII76gDyMYo3HVcsC2+kxr2gH288MJwVTLPig3MZzOUWI0mZsP12wM8PWDFWQRE5gRESBF7DYxG2IMXiuDU1S9pc5mEEQw3BmZm9r39ME4Bzw9dqi0mak4ChYurdwcshLt8on6Y161IZYqUvVS2q9MsvSVN40JY7aGKUaJbpSg0A2IYFSTGgG+nnf6ulez+DvingqVCEDAZyajKJAZszAsSc0wsQLW2mMeoTnFKqjNSmrBylVENM7hoyjzMY+O8NwppmqoTKSRPSAyuCTEmQoJzSIE27AY7xj028IvQIekep6bmn4kdwAQInNYbaxOJ2Prj8ehJAYZl+ZQczKYBgqs3uMdLeePmHJOe1KXD+DSzK2Yt4rFKmYElmlSFEjczp7Y1OY8/dkZgy0hmEs7EqV1GUGFKkC4Eg3vqcVHu4I/EPfT9/XDKAY8jw3OGBZRTQE3V5tAUH5doB/m9JwvxXN+KBUpVUgn/APGO/eDAMi8biMUfQaMAYFXM4+ecVz/jTIVwPRFJ2NiRC6xJ088Zb8VxJQ1H4qst4AVjJMi0KLHTa3niD6HzjjkooalRsqgfXyA3J7YwK/xAjiKTRP4ouPRb+dz2OPE8y4FlRnUGpV1AqAkPJEkvNzYk6TO+uHOWUP4SGoo8Q9TFYXeQsiJtbXQTAxRurUmSakhzJP4vWQZAsbRbXS2L8rCwXUqS0kSZU7TB0NgPP81uUqF6Qu+ZjAEnTSL3iTrsdIwyKY2kPaWC3iLSYhh9x5YC9FArFyxJM3qLBidwApIB09tcXSmocMQuYGflgAm2pm2t59dcAo8W2cowVSOwmfPNBy222tglesQG8M9QBgskrmAtmA+Yb6/TaBbiOXNVzEtVTMhplFaEENZrepvYwbjF+M5VTYIzjxTSgrIzsWA1+aWJga/XXDJcFjcmBJEEMFP9PzRY/fFzWmwXMLSeo2v1AkQ8T56nAcAa5DMwUyFsbfyq0SBM2JmbaDAaGgUGoTljM/8AEPrM+evp2wN6ZW1IhRmMt8oAM2HSRrthbmHF1KRpApmFSoqzlzqsmZI1AIzAEsYN4OmA2aRCghYUkAzqBsBlmR7Wxjc+c06LtRDVKmaQhY37iMx2H20xg8PzhFptUNYVYJKuyuoDaLTJUKrg5fm1B/mtC/M+MNRVVQwKhnimgkEWJLsD4QIBgKQCSbkm8tXFeDd+IJ8SswKtm6aZAIJuocklgoBgZQeojcHDnM3aadSqlNalME5UAL9JgA1UsVGv8y3gmTjH4akl2qZTky+GzVKlPMZAJU+NCwJI6TMbbu1eAp5czJxCE/LTY08qhlLAOxRtQwAMCw3N8Ys7bl6Z3NKmaQrZpIY1HApgkiwBkEkGR8haQNRbHOF5S9SjUL1auSmmZ+rokn5Mp6qrwMxiwEEkYZ4PhX8OoEfhkekUdHgNmLdJp+KBlFgZULBgTrIS4OlmPXlpU1lnPWBUJsVBUwbm2WMt+wGNMhcDSpJmyM4MMAbRm+WCSsmFOaBc2tiiUwhdiXqLGWUWLG5JOwMReTcd8O8RyekoLA05K5h4dUVBDgZSoyjQqwgxBEHeFeJegBVcVCGBAUSxYCAILwDGp0Ow2nALUuXgw1Jwp1CmQAtwDnBJDfMCMo0NzjmNLgOX1EpirTKsX6QSyUzPzGZM6TcrvGO4vlxPGvf8T0iTpE33/d9P1xEqADyiSWMR6yJ3wPxdNr6TtsTbyGmO0l6QSYP9IjfTce840ysrgmQJEanTv0x2/Xvi1NwRIM7a2+0gYXFMIB20AWRO91G/mcWZigsZkzp1EzpYQR94+uAJSILGfTuYkb9gbd8LrVUSaZUxALD5tLDMJB/Tti1WsWFlkn+uI9wbabYX4ZyWM1CIEZTcR6mDvEwCPOcBx+K6SVyx5/KTcENBi3eDr3xeoA2WVI1AUmcwjt38oJ9LYYBsJBjYgEamLMLHTFalMqyALKyQWBVsttTJ0IlTAkyMB3hmzEgKN5Ur0j1BNtNbeeDOgu2rG0EAr7RBIv6fng2TMIKSJ1mR5mdJ9f8AGOMhVhMDtAIkz30BsL98AWjwyQodEtJiQQpN5F5E/rivE8mouCoz05HU9Nysbd/M/fHVQLGYfLJzELr3tvBjefpDNgIYiP8A3EEeptHex/yGC/K6iQFy1VEbBXECCTe/4RYDz86lKaiWzLH4nQ99TMSZH0jG/wAPUVgQhDXgwZ/qgRpYz7g4IWBsQL7GPKTEmI9cB56lTQjRWmwyn7kQADqLX7YHW4EyRkLyMpBjQkTvm3O22NyvwNKJNJb9hlJvF4iRf7nC/wD22nmszi25zL6gsJ72nTAZfhstrjXL8zLFiDGikab6a4i03E5e25ka/wAu4n3mfXGuOXrFqr2MjSSdexm99sZ3NuQF8uWvlCQ2U0w2c/1AZQR64BbhqJDR0KSc9lEFtnBMkj+ktGszriO8kwQToxEEexiV376nXDacoqFcviUsyHYMJPaAba6+vpgp5HVW9SorJAOUUytwZF814MbDAZfCVahN0YXkFnkkADQgAxYmCfxG8RDWdmYEDY3ZHAmRlGaCW7kRA+gxq0eGgdPh5zaykH9Tfzx0msIOSmbSVFQgjyA8OLxNz3GAz+GWrYiqcxEFWVgkho6Wg+X4d5thavzKotvDBm5ZXLgEeTKDHvGl8a78ZUBk0yAd1KmI8s4ifS4m+A0OLksClS9oILZSBvlYxM+VsBl0uZFXCspapUhSATC3soDLJmZ7bE6SQc2SnUdqj/wx0oMogEEqTnUdeY6A2ETG4163EJl6kciNka9tjGvlrjH4v/jvXppUpVFqNLqepQrJMNI6SSJgxNxiCz88oKrM1QCwJhnVssdPSIJ1FogTMmDi/EcxVULkFiIOVX6iLSYMLO/V21xzjOUS2YOQTckql1t0iFkA98Z1bkrscy1GIk9LNIuQSRYywAtMxtE4na9Djm9Ih4JypdJCAKdwF2IIzdUfNaRhPjuZVD4b0ytIFwpzEHMACSvSSGGt7Qd7nCHN+Efh2JNNGDAwzKWLsAYlYZROY9h0iTtgBr1hQ8PwgKWUEjpDMbEszNmzCfLUE+eJtXpfn1MGoCnFCqjRTPQKaxJJBpOWDKLnNIN9BGLjhFSlm6WVj0T4TMxuMoYEgAZGJBKgkLOs46qOtFSiZi6jOUKgNFxLEHOus9/KTgVGiAzkgCo3U7JCtBueqCVI06SPvidqlCjRjrWogc9RDLnLrFlUy8GZAB0keeE+MdRVFFUh2bJmDNmRpAzZYPSFvlvob40jwrs00yy2YFzUZTDfhIIYMNDHp2xStwVWjw5DgVFsfDp1GWeoQbGzEA3U/hFjOKjN4WjUU1CSQy5iBlvYDqzMCCrGRIYZipG4kacc1dz/AOnzO4yyfEZmgTsRl3MqALe+NThuX8O1NHipSJkhXqZh3gg+d4Ot5GuGuX0qSFifCNwAC2ZpIGwACyZsInAefJphC7q6upC5KbBwVBuZ6ggAKiJItEQcOVjRo0wS9Wm7KKhpqtJhBHSJjoYjVctovE42OYcGKmSqrIhWOoow0sIKkX01kYV43gkH8RqtQVU1JWQWOgzEDIXAN83niZV1mcp+IKdNXD01cFpzlFzE2sQB066xBx3GnwfOX41loGmHCqTTD0QzBQbgOdE0MGZMbxiYZ+jXpJLAMCmX8Vs0QZtBIHrP1xao7BgyiZEzOW3YG2b0OLMgAJygk3aYuLxYDy7XvjhcQUJYHaFPb9mR/nHRhyvWdTp3gkxptAuTY6YEnCmZqXJ/EmZRO8jMZ23v5Y4+VBdW26hpbfSFj9N8WpAEWYEfMJZpNjoxIJvbQjXQYg4sgghQoAidzNpGttbEzbDLoSpGUkExGaSfO0+oF9Nd8IPQYsrGoVyznVYhvUQCT/UTB3ONGiSwa6Ze0XPuQVMg6A/4BF3qLxARf/EyhyelTreV+Vp/mvl/PSym03GmrN9F07+mB8SIIIFxp1ZYE3gkeVx6+xAxaVXpJkWaDJHlf7kaQQMUcasuogC2i5T9zf8AEIjzAxfxrS8FbkDUmLwLAD3P2wuaS55ILEfi1PlMQw3tHudmaCiIgX3uD9AJ2GsabWwFeXcYKik+GacHLFQQTEXAExsPUHthtKrC0MNhO0e1rzF8Uc2yktlmxBIJ7bd9h62xakBsR6ESR3gFbT+fe+AlITM3P80a99o9fS98VDWN8wFu9wLiIAnXU+2OmRbLGwMSCfrbvbGXzXmZpVqCBCwqvlLgwqmQZg5pmZ841wGlQ4gsoKhkJEkGSy20sQBF9Bvgi1CBcBTsR+pIOv5YGjTJKQJgAmx2mASNNjiuYLBW5mLAk6+Ufla2AbSpsTE6Taft7x9sdWBcmd5Nz7Xtr/jAXUEiSba7THexM20n1xxqkdRbKN7DT1j8r4BmtUBXLY9ryfpEjscdpMwA/MjTTQAT9fthFXzSDp3IAgd4Fh6H9MEpiD0gmReZmfI9/KfbfAH4hzGXKRM7H7wZ9/PA0a8FWJG8GL9wOmfODrvgaNDRDWFwSWgzuZIAP7GKpUE5iCCe0TpqI1Bn1wBuG2MRbUKNO20TY6aY5UdnCjPkvNgLxtLKQZMW+8YE6E303EEqTsZExHeZ+2OMXgAFSAPluT5HQlowDCtuyyRsBaI2uO2/9sKLDMWDWM/gZxvIgtlnyAGm8YOIETYAE5iPm+hjbU/piUqS6KogybGIB7iBE+Qi2AlEweq/YKBHbTXN5C9x3xasG6MsKsnMMuoIPymQBeNZ0PqKs6qIQ3H4QTb2FhpuPvOMnnPNF8PMxKJvmGSxIAOcGBJ0uNfXECHOqlQ1QAxRUBEIZDyBJa1ipBgiTjG4PgqecirU8UaqXBYged4J7ny8reo4Lly5ZbVrwdtxeQSL3/LGZzDgWpFSoNQOYtonY31/OMZrTN4U9bAkwhhISBDEEkW6hMDWROmGV4bqgMCZGhUH6RP+sd4wVacjKC8SFVGGZu2a+U+o7Y0eF4YoCxZgx6jmMgGACL2XYTbTASvwyeGFJMKJk3M+0mfacYHA8elNHpoahg9Vyylc0kCYyEkyJg69zhjmvOPCYjJ0MY67T/UuYZvYyCBrecLcTWRlknLVDMnUSV+bV0swPTpeNJ7KRucBxFI0vEZUWDalmhpYnWQASLEi92OojGP8UVcwpFKa0pYgs4RCy3XQACNzJsR7AXBPVdUqeK1QklREADXMuUHOo1iBfuu6PBvVCsQENMMJRVFWbzFwWUbGCCNcAXl3E1aednp16rgBFmpKLNpNPLP8oEWtEjGivNqjjJUpMbkRGUnKuhiRMGxMDz0xajwFEFxRemrQzHKapWFIAOVpUs0gwCLA+eMx0qCpKkMQ4BZyQ20kAHIonYdhDDDdMHamh8TKi0wpgNmZHgtOUw1x5ADLCi8YmGOaVKRcHwuhBkdWqLTHiWJcuhzVCx0Zo13nEwHrOG+T3OFTqv8A8scxMbZCpfOTv1X9Gt9MM8V/4h6D/wDXExMQK8vcgiCR1HfyGNrhvxfvcYmJi0SgZKzezYKEAprAAu23niYmJCh0vlX1H6Y47G9/wE+864mJiiLqvr/9cDrsc1S+2JiYgpwfyj1/TDoQEU5ANxqJ3OJiYo8xxdQnmdIEkiNJtodsey4dBew328scxMSLSzoCskAmDePI4W4K1NSLEsZO59TviYmKyZ4b5V9T+RwCt8n/AMv1xMTBTVNRkNtv1GM2pp7/AN8TEwDVVj032OL8Z81L1P5HExMBcIJ0Gnb0wHjOlUy2/iDS34sTEwAK9Q5dTbNF9PTtjxnJaheqoclgWuGMz82s64mJiUj3qqLW7YJxGi/vc45iYzGqwviYRxCRa6/phjgdD+9sTEwg878RV2FCzMOojU6dsZHFGUoTeal5vNxr3xMTD2ehgfzpf/zOCcwvRSb3/U4mJgNv4UrtldczZZ+WTHyjbTDCoDTouQC/8Tqjq231x3Exn3V9RkM58Om0mcovN/xb4mJiYiv/2Q==';
    this.homeService.createTask(data.name, data.lat, data.lng, data.desc, data.points, img).finally(() => {
      this.showToasterSuccess('Successfully Created Task', '');
    })

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  showToasterSuccess(title: string, body: string): void {
    this.notifyService.showSuccess(title, body);
  }

  showToasterError(title: string, body: string): void {
    this.notifyService.showError(title, body);
  }

  showToasterInfo(title: string, body: string): void {
    this.notifyService.showInfo(title, body);
  }

  showToasterWarning(title: string, body: string): void {
    this.notifyService.showWarning(title, body);
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const srcResult = e.target.result;
        console.log('srcResult is' + srcResult);
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
