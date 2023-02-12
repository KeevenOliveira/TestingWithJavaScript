import { get } from './service.middleware';

describe('service.middleware', () => {
  it('should add service to the request', () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    get(req, res, next);
    expect(req.service).toBeDefined();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });
});
