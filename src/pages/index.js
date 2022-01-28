import React, { useState } from 'react'
import appConfig from '../../config.json'
import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import { useRouter } from 'next/router'

function Title(props) {
    const Tag = props.tag || 'h1'

    return (
        <>
            <Tag tag='h1'>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}</style>
        </>
    )
}

export default function PaginaInicial() {
    const [username, setUsername] = useState()
    const [img, setImg] = useState('https://mystickermania.com/cdn/stickers/memes/sticker_2094-512x512.png')

    const routes = useRouter()

    return (
        <>
        <Box
            styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary['000'],
            backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/this-is-fine.jpeg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            }}
        >
            <Box
            styleSheet={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: {
                    xs: 'column',
                    sm: 'row',
                },
                width: '100%', maxWidth: '700px',
                borderRadius: '8px', padding: '32px', margin: '16px',
                background: 'rgba( 0, 0, 0, 0.6 )',
                boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
                BackdropFilter: 'blur(5px)',
            }}
            >
            {/* Formulário */}
            <Box
            as="form"
            autoComplete="off"
            onSubmit={e => {
                e.preventDefault()
                routes.push(`/chat?username=${username}`)
            }}
            styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
            >
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
            </Text>

            <TextField
                fullWidth
                value={username}
                onChange={e => {
                    setUsername(e.target.value)
                    if(e.target.value.length > 2) {
                        setImg(`https://github.com/${e.target.value}.png`)
                    }else if(e.target.value.length === 0) {
                        setImg('https://mystickermania.com/cdn/stickers/memes/sticker_2094-512x512.png')
                    }
                    
                }}                
                textFieldColors={{
                    neutral: {
                        textColor: appConfig.theme.colors.neutrals[200],
                        mainColor: appConfig.theme.colors.neutrals[900],
                        mainColorHighlight: appConfig.theme.colors.primary[500],
                        backgroundColor: appConfig.theme.colors.neutrals[800],
                    },
                }}
            />
            <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals["000"],
                    mainColor: appConfig.theme.colors.primary[500],
                    mainColorLight: appConfig.theme.colors.primary[400],
                    mainColorStrong: appConfig.theme.colors.primary[600],
                }}
            />
            </Box>
            {/* Formulário */}

            {/* Photo Area */}
            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
            }}
            >
            <Image
                styleSheet={{
                    borderRadius: '50%',
                    marginBottom: '16px',
                }}
                onError={() => setImg('https://mystickermania.com/cdn/stickers/memes/sticker_2094-512x512.png')}
                src={img}
            />
            <Text
            variant="body4"
            styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: '3px 10px',
                    borderRadius: '1000px'
            }}
            >
                {username || 'Dog'}
            </Text>
            </Box>
            {/* Photo Area */}
        </Box>
        </Box>
    </>
    );
}