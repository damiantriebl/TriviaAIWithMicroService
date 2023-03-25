'use client';
import Arrow from './arrow';
import { useState } from 'react';

interface Settings {
    title: string;
    principalData: string;
    data: string[];
    configuration: 'topic' | 'difficulty' | 'language';
    allHidden: boolean;
    handleOption;
}
// a image of a old rpg game character, with a image and a text to show the dialog
function SettingsMenu<Settings>({
    title,
    principalData,
    options,
    configuration,
    allHidden,
    handleOption,
}) {

    const [openConfiguration, setOpenConfiguration] = useState(false);
    const [openConfigurationOver, setOpenConfigurationOver] = useState<string>('');
    const handleSettings = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setOpenConfiguration((prev) => !prev);
    };
    const handleHover = (
        e: React.MouseEvent<HTMLDivElement>,
        menuType: string,
    ) => {
        e.stopPropagation();
        setOpenConfigurationOver(menuType);
    };

    return (
        <section>
            <div
                onMouseOver={(e) => handleHover(e, principalData)}
                onMouseLeave={(e) => handleHover(e, principalData)}
                className="my-4 flex flex-row"
                onClick={(e) => handleSettings(e)}
            >
                <Arrow
                    className={`${openConfiguration && allHidden ? 'visible' : 'invisible'
                        }`}
                />
                <h1>{title}</h1>
                <div
                    className={`${openConfiguration && allHidden ? 'visible' : 'invisible'
                        }`}
                >
                    {options.map((obj) => {
                        // * This element is a div and not a button because the button causes hydration problems
                        return (
                            <div
                                onMouseOver={(e) => handleHover(e, obj)}
                                className={`${configuration === obj ? 'text-slate-900' : 'text-slate-600'
                                    } flex flex-row pb-4`}
                                onClick={() => handleOption(obj, principalData)}
                                key={obj}
                            >
                                <Arrow
                                    className={`${openConfigurationOver === obj ? 'visible' : 'invisible'
                                        }`}
                                />
                                <h2>{obj}</h2>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
export default SettingsMenu;