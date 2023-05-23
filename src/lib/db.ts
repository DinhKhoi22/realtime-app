import { Redis } from '@upstash/redis'

export const db = new Redis({
  url:'https://usw1-casual-sawfly-34220.upstash.io',
  token:'AYWsASQgZjhjZjVjNzQtYjIzMC00OWM5LTk1M2EtMGEyZTA4YjA2ZmM1ZTE4MWI1NWRiMWU1NGE2NmJmYmY1YzhiYTUyN2Q1ZDc=',
})
