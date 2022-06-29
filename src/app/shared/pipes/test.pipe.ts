import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TestPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    console.log('Im test pipe');
    return value;
  }
}
