import Pusher from 'pusher-js/worker';

const AppConfig = {
  baseURL: "https://doanxem.com/api/"
}

export const AppPusher = new Pusher("6703eff6d3b7ce1a22b4", {
  cluster: "ap1",
});

export default AppConfig
