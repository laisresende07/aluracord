import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import appConfig from '../../config.json'
import { ButtonSendSticker } from '../components/ButtonSendSticker'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwMzYwMywiZXhwIjoxOTU4ODc5NjAzfQ.XpObNsCTnR8wClc5iPXTb5xHtQ3kM3GrHjRPSaJtsFc'
const SUPABASE_URL = 'https://zxknhuscmcytbesfoial.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function listenerMessages(addMessage) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', res => {
            addMessage(res.new)
        })
        .subscribe()
}

export default function Chat() {
    const routes = useRouter();
    const user = routes.query.username;
    const [mensagem, setMensagem] = useState('')
    const [listaDeMensagens, setListaDeMensagens] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabaseClient
        .from('mensagens')
        .select('*')
        .order('id', { ascending: false })
        .then(res => {
            setListaDeMensagens(res.data)
            setLoading(false)
        })

        const subscription = listenerMessages(newMessage => {
            setListaDeMensagens(lista => [
                newMessage,
                ...lista,
            ])
        })
        
        return () => {
            subscription.unsubscribe();
        }
    }, []);
    

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            de: user,
            texto: novaMensagem,
        }

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(() => {})

        
        setMensagem('')
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary['000'],
                backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/this-is-fine.jpeg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    borderRadius: '8px',
                    background: 'rgba( 0, 0, 0, 0.6 )',
                    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
                    BackdropFilter: 'blur(5px)',
                        height: '90%',
                    maxWidth: '90%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '8px',
                        padding: '16px',
                    }}
                >
                    {
                        loading ?
                        <Box
                        styleSheet={{
                            display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Box id="dots">
                                <Box></Box>
                                <Box></Box>
                                <Box></Box>
                            </Box>
                            <style global jsx>{`
                                @keyframes wave {
                                    from {
                                        transform: translateY(-100%);
                                    }
                                    to {
                                        transform: translateY(100%);
                                    }
                                }
                                
                                #dots {
                                    height: 100%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                }
                                
                                #dots div {
                                    width: 15px;
                                    height: 15px;
                                    background: #d6d6d6;
                                    border-radius: 50%;
                                    margin: 0 5px;
                                    
                                    animation: wave .7s ease-in-out infinite alternate;
                                }
                                
                                #dots div:nth-child(1) {
                                    animation-delay: -0.4s;
                                }
                                
                                #dots div:nth-child(2) {
                                    animation-delay: -0.2s;
                                }
                                
                            `}</style>
                        </Box> :
                        <MessageList mensagens={listaDeMensagens} />
                    }
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={e => {
                                const valor = e.target.value
                                setMensagem(valor)
                            }}
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    if((mensagem.trim()).length > 0) {
                                        handleNovaMensagem(mensagem.trim())
                                    }
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '8px',
                                padding: '14px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker
                            onStickerClick={sticker => {
                                handleNovaMensagem(`:sticker:${sticker}`)
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    // console.log(props)
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image styleSheet={{
                                    maxWidth: '200px'
                                }} src={mensagem.texto.replace(':sticker:', '')} />
                            )
                            : (
                                mensagem.texto
                            )}
                    </Text>
                )
            })}
        </Box>
    )
}