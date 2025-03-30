import { platformServer, renderModule } from '@angular/platform-server';
import { AppModule } from './app/app.module';

export default function render(): Promise<string> {
  return renderModule(AppModule, {
    document: '<app-root></app-root>',
    url: '/'
  });
}

