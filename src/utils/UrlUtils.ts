export class URLUtils {
    /* appends query param/value to url string */
    public static addQueryParam = (url: string, queryParam: string, value: string) => {
        const parsedUrl = new URL(url);
        queryParam && value && parsedUrl.searchParams.append(queryParam, value);

        return parsedUrl.toString();
    }

    /* Returns url with possibly many appended query params */
    public static getUrlWithParams = (url: string, params: ({ param: string; value: string | undefined; })[]) => {
        let newUrl = url;

        params.forEach(p => p && p.param && p.value && (newUrl = this.addQueryParam(url, p.param, p.value)));

        return newUrl;
    }
}