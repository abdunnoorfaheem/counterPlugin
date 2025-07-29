// সব .counter class ওয়ালা ডিভ গুলা খুঁজে বের করি
const counters = document.querySelectorAll(".counter");

// প্রতিটা DOM element থেকে element আর target number বের করে নিই
const arr = Array.from(counters).map(item => ({
  el: item,
  target: parseInt(item.dataset.number, 10) // data-number এর মানটা নিয়ে আসি
}));

// কোনটা সবচেয়ে বড় সংখ্যায় যাবে, সেটা বের করি
const maxTarget = Math.max(...arr.map(o => o.target));

// মোট সময় ঠিক করি — বড় সংখ্যার উপর ভিত্তি করে সময় বাড়াই যেন সব একসাথে শেষ হয়
const baseDuration = 2000; // সাধারণত ২ সেকেন্ড ধরতাম
const duration = maxTarget > 500 ? baseDuration * (maxTarget / 500) : baseDuration;
// যেমন: 2500 হলে duration = 2000 * (2500 / 500) = 10000ms = ১০ সেকেন্ড

// এবার প্রতিটা কাউন্টার চালাই
arr.forEach(({el, target}) => {
  let count = 0;
  // প্রতি বাড়ানোর সময় বের করি — যত বড় সংখ্যা, তত কম সময় delay
  const delay = Math.max(Math.floor(duration / target), 1); // কমপক্ষে ১ মিলিসেকেন্ড যেন হয়

  // প্রতি delay সময়ে count বাড়ায়
  const timer = setInterval(() => {
    count++;
    el.innerHTML = count; // HTML এ দেখাই
    if (count >= target) {
      clearInterval(timer); // শেষ হলে বন্ধ করি
    }
  }, delay);
});
