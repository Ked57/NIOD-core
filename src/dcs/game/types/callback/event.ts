type Event = {
  type: string;
  name: string;
  data: { [key: string]: any };
};

export default Event;
