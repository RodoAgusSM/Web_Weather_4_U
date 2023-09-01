import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB, } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: any) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(() => {
      onCLS(onPerfEntry)
      onLCP(onPerfEntry);
      onFID(onPerfEntry);
      onFCP(onPerfEntry);
      onINP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
