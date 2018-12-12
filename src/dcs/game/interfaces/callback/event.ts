export default interface Event {
  type: string;
  name: string;
  data: { [key: string]: any };
}
