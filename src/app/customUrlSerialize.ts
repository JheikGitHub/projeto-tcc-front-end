import {UrlSerializer, UrlTree, DefaultUrlSerializer} from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {

    private defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

    parse(url: any): UrlTree {
        url = url.replace(/\-/gi, '%20');
        return this.defaultUrlSerializer.parse(url);
    }

    serialize(tree: UrlTree): any {
        return this.defaultUrlSerializer.serialize(tree).replace(/\%20/gi, '-');
    }
}