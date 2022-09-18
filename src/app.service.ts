import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

// const web3 = new Web3('https://goerli.gateway.metisdevops.link');

@Injectable()
export class AppService {
  helloWorld() {
    return '';
  }
}
