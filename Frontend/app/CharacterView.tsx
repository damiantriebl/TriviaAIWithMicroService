'use client';
import { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import Hero from '../public/hero.svg';
import { npc, settingsData, difficultyLevel, defaultConfiguration } from '@/schemas/constants';
import Character from '@/ui/Character';
import Gear from '@/ui/gear';
import SettingsMenu from '@/ui/SettingsMenu';


const CharacterView = ({ data }) => {
    const [position, setPosition] = useState({ x: 150, y: 300 });
    const [answered, setAswered] = useState({
        [npc.Elliot]: false,
        [npc.Donna]: false,
        [npc.Margaret]: false,
    });
    const [configuration, setConfiguration] = useState(defaultConfiguration);
    const [openConfiguration, setOpenConfiguration] = useState(false);
    // convert difficultylevel to array

    useEffect(() => {
        if (
            answered.donna === true &&
            answered.margaret === true &&
            answered.elliot === true
        ) {
            setAswered({
                [npc.Elliot]: false,
                [npc.Donna]: false,
                [npc.Margaret]: false,
            });
            if (configuration.difficulty !== difficultyLevel[difficultyLevel.length - 1]) {
                setConfiguration((prev) => ({
                    ...prev,
                    difficulty:
                        difficultyLevel[difficultyLevel.indexOf(prev.difficulty) + 1]
                }));
            }
        }
    }, [answered]);


    // check the position of the mouse, and modify state with this positition
    const handleMovement = (e: React.MouseEvent<HTMLDivElement>) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleDialogSet = (name: npc, response: boolean): void => {
        setAswered((prev) => ({ ...prev, [name]: response }));
    };
    const handleSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setOpenConfiguration((prev) => !prev);
    };
    const handleOption = (option, group) => {
        setOpenConfiguration(false);
        setConfiguration((prev) => ({ ...prev, [group]: option }));
    };
    return (
        <section
            onClick={handleMovement}
            className="z-10 h-screen w-screen space-y-6 border-[3rem]	 border-slate-800 p-[3rem]"
        >
            <div onClick={handleMovement} className="space-y-8 text-white">
                <h1 className="text-center text-4xl font-bold text-slate-50">
                    Level {configuration.difficulty} Topic {configuration.topic}
                </h1>
                <Image
                    style={{ top: position.y - 100, left: position.x - 50 }}
                    src={Hero}
                    alt="The only hero in this story"
                    width={80}
                    height={80}
                    className={`absolute transition-all	`}
                />
                <div className="absolute top-10 right-20 flex h-screen  flex-col justify-between p-36 px-64">
                    {Object.values(npc).map((npcCharacter: npc): ReactNode => {
                        return <Character
                            dialogSet={handleDialogSet}
                            configuration={configuration}
                            name={npcCharacter}
                            answered={false}
                            context={data}
                            key={npcCharacter}
                        />
                    })
                    }

                </div>
            </div>
            <div
                className={`${openConfiguration ? 'visible' : 'invisible'
                    } absolute bottom-[9rem] flex flex-col rounded-2xl  border-4 border-stone-800  bg-slate-200 p-6 text-slate-700`}
            >
                {settingsData.map(obj => {
                    return (<SettingsMenu
                        key={obj.type}
                        handleOption={handleOption}
                        allHidden={openConfiguration}
                        configuration={configuration.topic}
                        principalData={obj.type}
                        title={obj.title}
                        options={obj.options}
                    />)
                })}
            </div>
            <button onClick={(e) => handleSettings(e)}>
                <Gear
                    className={`absolute bottom-[5rem]`}
                />
            </button>
        </section>
    );
};

export default CharacterView;
