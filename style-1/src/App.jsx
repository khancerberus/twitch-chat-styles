import { useEffect, useState } from 'react'
import tmi from 'tmi.js'

function App() {
  const [messages, setMessages] = useState([])
  const client = new tmi.Client({
    channels: ['khancerberus']
  })

  useEffect(() => {
    client.connect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    client.on('message', (channel, tags, message) => {
      console.log(tags)
      console.log(`${tags['display-name']}: ${message}`)
      setMessages((prev) => [
        ...prev,
        {
          isVip: tags['vip'],
          isMod: tags['mod'],
          color: tags['color'],
          user: tags['display-name'],
          message
        }
      ])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  return (
    <main className="flex p-2 w-screen h-screen">
      <ul className="flex flex-col justify-end gap-1 w-fit">
        {messages.map((msg, index) => (
          <li className="flex flex-col ps-4 pe-[36.5px] w-fit relative anim" key={index}>
            <div
              className="flex items-center gap-1 rounded-lg p-1"
              style={{
                textShadow: '0 0 7px ' + msg.color
              }}
            >
              {msg.isVip && (
                <span>
                  <img
                    src="https://avatars.githubusercontent.com/u/58091453?v=4"
                    alt=""
                    width={24}
                  />
                </span>
              )}

              {msg.isMod && (
                <span>
                  <img
                    src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/6/6a/Diamond_Sword_JE2_BE2.png"
                    alt=""
                    width={24}
                  />
                </span>
              )}
              <span
                style={{
                  color: msg.color
                }}
              >
                {msg.user}
              </span>
            </div>
            <span
              className="text-[#ffffff] bg-slate-950 w-[300px] p-1 rounded-tr-lg rounded-bl-lg "
              style={{
                overflowWrap: 'anywhere',
                boxShadow: '0 0 7px #83f7ff'
              }}
            >
              {msg.message}
            </span>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
