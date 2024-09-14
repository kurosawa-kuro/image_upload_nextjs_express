import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from 'util';
import 'whatwg-fetch';

declare global {
  var TextEncoder: typeof global.TextEncoder;
  var TextDecoder: typeof global.TextDecoder;
}

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = NodeTextEncoder as unknown as typeof global.TextEncoder;
  global.TextDecoder = NodeTextDecoder as unknown as typeof global.TextDecoder;
}

// グローバルオブジェクトに存在しない場合のみ追加
if (!global.Response) {
  global.Response = Response;
}
if (!global.Request) {
  global.Request = Request;
}
if (!global.Headers) {
  global.Headers = Headers;
}
if (!global.fetch) {
  global.fetch = fetch;
}

// Jest DOM拡張をインポート
import '@testing-library/jest-dom';