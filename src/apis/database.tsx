// @ts-ignore
import { SQLiteDatabase } from 'react-native-sqlite-storage';
// @ts-ignore
import SQLite from 'react-native-sqlite-storage';

// Ouvrir ou créer la base de données
export const db = SQLite.openDatabase(
    {
        name: 'zandpdatabase',
        location: 'default',
    },
    () => { console.log('Base de données ouverte') },
    (error: any) => { console.log('Erreur lors de l’ouverture de la base de données', error) }
);

// Fonction pour récupérer un utilisateur par son email
export const getUserByEmail = (email: string) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
            tx.executeSql(
                'SELECT * FROM Users WHERE email = ?;',
                [email],  // Paramètre de la requête SQL
                (tx: any, results: any) => {
                    if (results.rows.length > 0) {
                        let user = results.rows.item(0);  // Récupérer le premier utilisateur trouvé
                        resolve(user);  // Résoudre la promesse avec l'utilisateur trouvé
                    } else {
                        resolve(null);  // Aucune correspondance, retourner null
                    }
                },
                (error: any) => {
                    console.log('Erreur lors de la récupération de l’utilisateur', error);
                    reject(error);  // Rejeter la promesse en cas d'erreur
                }
            );
        });
    });
};



export const createTable = async (db: any) => {
    db.transaction((tx: any) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Users (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT, 
                email TEXT, 
                password TEXT
                );`,
            [],
            () => { console.log('Table Users créée avec succès') },
            (error: any) => { console.log('Erreur lors de la création de la table Users', error) }
        );
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS event_registration (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,                                    -- Nom de la personne ou de l'entité enregistrée
                active BOOLEAN,                               -- Statut actif ou non
                barcode TEXT,                                 -- Code-barre de l'enregistrement
                email TEXT,                                   -- Adresse e-mail de la personne enregistrée
                phone TEXT,                                   -- Numéro de téléphone
                state TEXT,                                   -- État de l'enregistrement (par exemple, "open")
                event_ticket_id INTEGER,                      -- Identifiant du billet pour l'événement
                ticket TEXT, 
                urlDownload TEXT,
                create_date TEXT,                             -- Date de création de l'enregistrement
                write_date TEXT,                              -- Date de la dernière mise à jour
                event_id INTEGER,                             -- Clé étrangère qui fait référence à la table Events
                FOREIGN KEY (event_id) REFERENCES Events(id)  -- Référence à la table Events
            );`,
            [],
            () => { console.log('Table event_registration créée avec succès') },
            (error: any) => { console.log('Erreur lors de la création de la table event_registration', error) }
        );

        // Créer la table Partner avec une clé étrangère référencée sur Users
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Partners (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                phone TEXT, 
                role TEXT, 
                mobile TEXT, 
                address TEXT, 
                user_id INTEGER,
                FOREIGN KEY (user_id) REFERENCES Users(id)
                );`,

            [],
            () => { console.log('Table Partner créée avec succès') },
            (error: any) => { console.log('Erreur lors de la création de la table Partner', error) }
        );
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Tickets (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT, 
                create_date TEXT, 
                color TEXT,
                event_id INTEGER,                             -- Clé étrangère qui fait référence à la table Events
                FOREIGN KEY (event_id) REFERENCES Events(id)  -- Référence à la table Events
                );`,
            [],
            () => { console.log('Table Tickets créée avec succès') },
            (error: any) => { console.log('Erreur lors de la création de la table Tickets', error) }
        );
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,    
                name TEXT,                              
                badge_format TEXT,                       
                badge_image BOOLEAN,                    
                community_menu BOOLEAN,                  
                cover_properties TEXT,                  
                create_date TEXT,                        
                date_begin TEXT,                         
                date_end TEXT,                         
                date_tz TEXT,                            
                description TEXT,                        
                introduction_menu BOOLEAN,               
                is_published BOOLEAN,                    
                kanban_state TEXT,                       
                kanban_state_label TEXT,                
                lang TEXT,                               
                location_menu BOOLEAN,                   
                menu_register_cta BOOLEAN,               
                note TEXT,                               
                seats_limited BOOLEAN,                   
                seats_max INTEGER,                       
                attendees INTEGER,                       
                write_date TEXT,                        
                stage TEXT,
                address TEXT,                      
                country TEXT,                      
                organizer_id INTEGER,                    
                FOREIGN KEY (organizer_id) REFERENCES Partners(id)
            );`,

            [],
            () => { console.log('Table event créée avec succès') },
            (error: any) => { console.log('Erreur lors de la création de la table Partner', error) }
        );
    });


};
export const dropTable = async (db: any) => {
    db.transaction((tx: any) => {
        tx.executeSql(
            `DROP TABLE Tickets;`,
            [],
            () => { console.log('Table event_registration a ete supprimée avec succès') },
            (error: any) => { console.log('Erreur lors de la création de la table Users', error) }
        );

    });


};




export const loginUserWithPartner = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
            // Faire une jointure entre Users et Partner pour obtenir toutes les informations
            tx.executeSql(
                `SELECT Users.*, Partners.phone, Partners.role, Partners.mobile, Partners.address 
                FROM Users 
                LEFT JOIN Partners ON Users.id = Partners.user_id 
                WHERE Users.email = ? AND Users.password = ?;`,
                [email, password],
                (tx: any, results: any) => {
                    if (results.rows.length > 0) {
                        let user = results.rows.item(0); // Récupérer les informations de l'utilisateur et du partenaire
                        resolve(user); // Renvoie toutes les informations (utilisateur + partenaire)
                    } else {
                        reject('Email ou mot de passe incorrect');
                    }
                },
                (error: any) => {
                    reject('Erreur lors de la connexion: ' + error.message);
                }
            );
        });
    });
};


export const createUserWithPartner = (id: number, name: string, email: string, password: string, phone: string, role: string, mobile: string, address: string, partner_id: number) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
            // Vérifier si l'email existe déjà
            tx.executeSql(
                'SELECT * FROM Users WHERE email = ?;',
                [email],
                (tx: any, results: any) => {
                    if (results.rows.length > 0) {
                        reject('Cet email est déjà utilisé.');
                    } else {
                        // Insérer un nouvel utilisateur dans la table Users
                        tx.executeSql(
                            'INSERT INTO Users (id, name, email, password) VALUES (?, ?, ?, ?);',
                            [id, name, email, password],
                            (tx: any, userResults: any) => {
                                const userId = userResults.insertId; // Récupérer l'ID de l'utilisateur inséré

                                // Insérer un enregistrement dans la table Partner en utilisant l'userId
                                tx.executeSql(
                                    'INSERT INTO Partners (id, phone, role, mobile, address, user_id) VALUES (?, ?, ?, ?, ?, ?);',
                                    [partner_id, phone, role, mobile, address, userId],
                                    () => {
                                        resolve('Utilisateur et partenaire créés avec succès');
                                    },
                                    (error: any) => {
                                        reject('Erreur lors de la création du partenaire: ' + error.message);
                                    }
                                );
                            },
                            (error: any) => {
                                reject('Erreur lors de la création de l’utilisateur: ' + error.message);
                            }
                        );
                    }
                },
                (error: any) => {
                    reject('Erreur lors de la vérification de l’email: ' + error.message);
                }
            );
        });
    });
};

export const insertEvent = (eventData: any) => {
    const {
        id, name, badge_format, badge_image, community_menu, cover_properties,
        create_date, date_begin, date_end, date_tz, description, introduction_menu,
        is_published, kanban_state, kanban_state_label, lang, location_menu, menu_register_cta,
        note, seats_limited, seats_max, write_date, address_id, country_id, organizer_id, registration_ids, stage_id
    } = eventData;

    const address = address_id[0]?.name || '';
    const country = country_id[0]?.name || '';
    const stage = stage_id[0]?.name || '';
    const organizer = organizer_id[0]?.id || null;
    const attendees = registration_ids?.length || 0;
    return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {

            tx.executeSql(
                'SELECT * FROM Events WHERE id = ?;',
                [id],
                (tx: any, results: any) => {
                    if (results.rows.length > 0) {
                        tx.executeSql(
                            `UPDATE Events SET attendees = ? WHERE id = ?;`,
                            [attendees, id],
                            (tx: any, results: any) => {
                                if (results.rowsAffected > 0) {
                                    resolve({ success: true, message: 'Enregistrement mis à jour avec succès.' });
                                } else {
                                    resolve({ success: false, message: 'Aucun enregistrement trouvé avec ce code-barres.' });
                                }
                            },
                            (error: any) => {
                                resolve({ success: false, message: 'Erreur lors de la mise à jour de l\'enregistrement.', error });
                            }
                        );
                    } else {
                        tx.executeSql(
                            `INSERT INTO Events (
                                id, name, badge_format, badge_image, community_menu, cover_properties,
                                    create_date, date_begin, date_end, date_tz, description, introduction_menu,
                                    is_published, kanban_state, kanban_state_label, lang, location_menu, 
                                    menu_register_cta, note, seats_limited, seats_max, attendees, write_date, address,
                                    country, stage,organizer_id
                                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?);`,
                            [
                                id, name, badge_format, badge_image, community_menu, cover_properties,
                                create_date, date_begin, date_end, date_tz, description, introduction_menu,
                                is_published, kanban_state, kanban_state_label, lang, location_menu,
                                menu_register_cta, note, seats_limited, seats_max, attendees, write_date, address,
                                country, stage, organizer
                            ],
                            (tx: any, results: any) => {
                                resolve({ message: 'Utilisateur et partenaire créés avec succès', success: true, results });
                            },
                            (error: any) => {
                                resolve({ message: 'Utilisateur et partenaire créés avec succès', success: false, ...error });
                            }
                        );
                    }
                });
        });
    })
};


export const insertEventRegistration = (data: any) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
            data.forEach((item: any) => {


                tx.executeSql(
                    'SELECT * FROM event_registration WHERE id = ?;',
                    [item.id],
                    (tx: any, results: any) => {
                        if (results.rows.length > 0) {
                            // console.log("element existant");

                            // reject({ message: 'Ce event_registration  Existe deja.', success: false, data: results.rows?.item(0) });
                        } else {
                            tx.executeSql(
                                `INSERT INTO event_registration 
                        (id, name, active, barcode, email, phone, state, event_ticket_id, create_date, write_date, event_id, ticket, urlDownload)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
                                [
                                    item.id,
                                    item.name,
                                    item.active || true,  // Conversion du booléen en 0 ou 1
                                    item.barcode,
                                    item.email,
                                    item.phone,
                                    item.state,
                                    item.event_ticket_id?.id || null,  // Extraction de l'ID du billet
                                    item.date,
                                    item.date,
                                    item.event?.id || null,
                                    item.ticket,
                                    item.urlDownload,
                                ],
                                (tx: any, result: any) => {
                                    console.log('Data inserted successfully: ', result);
                                },
                                (error: any) => {
                                    // console.log('Error inserting data: ', error);
                                    reject(error);
                                }
                            );
                        }
                    })
            });
        },
            (error: any) => {
                // console.log('Transaction error: ', error);
                reject(error);
            },
            () => {
                // console.log('Transaction complete');
                resolve('Transaction complete');
            });
    });
};

export const insertTicket = (data: any) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
            data.forEach((item: any) => {

                tx.executeSql(
                    'SELECT * FROM Tickets WHERE id = ?;',
                    [item.id],
                    (tx: any, results: any) => {
                        if (results.rows.length > 0) {
                            // console.log("element existant");

                            // reject({ message: 'Ce event_registration  Existe deja.', success: false, data: results.rows?.item(0) });
                        } else {
                            tx.executeSql(
                                `INSERT INTO Tickets
                        (id, name, create_date, color, event_id)
                        VALUES (?, ?, ?, ?, ?)`,
                                [
                                    item.id,
                                    item.name,
                                    item.create_date,  // Conversion du booléen en 0 ou 1
                                    item.color,
                                    item.event_id?.[0]?.id,
                                ],
                                (tx: any, result: any) => {
                                    console.log('Data inserted successfully: ', result);
                                },
                                (error: any) => {
                                    console.log('Error inserting data: ', error);
                                    reject(error);
                                }
                            );
                        }
                    })
            });
        },
            (error: any) => {
                // console.log('Tickets-Transaction error: ', error);
                reject(error);
            },
            () => {
                // console.log('Transaction complete');
                resolve('Tickets-Transaction complete');
            });
    });
};

export const createPartner = (user: any) => {
    const { id, name, email, password, phone, role, mobile, address, partner_id } = user

    return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
            // Vérifier si l'email existe déjà
            tx.executeSql(
                'SELECT * FROM Partners WHERE id = ?;',
                [partner_id],
                (tx: any, results: any) => {
                    if (results.rows.length > 0) {
                        reject({ message: 'Ce Partners  Existe deja.', success: false, data: results.rows?.item(0) });
                    } else {
                        // Insérer un nouvel utilisateur dans la table Users
                        if (id) {
                            tx.executeSql(
                                'INSERT INTO Users (id, name, email, password) VALUES (?, ?, ?, ?);',
                                [id, name, email, password],
                                (tx: any, userResults: any) => {
                                    const userId = userResults.insertId; // Récupérer l'ID de l'utilisateur inséré

                                    // Insérer un enregistrement dans la table Partner en utilisant l'userId
                                    tx.executeSql(
                                        'INSERT INTO Partners (id, phone, role, mobile, address, user_id) VALUES (?, ?, ?, ?, ?, ?);',
                                        [partner_id, phone, role, mobile, address, userId],
                                        () => {
                                            resolve('Utilisateur et partenaire créés avec succès');
                                        },
                                        (error: any) => {
                                            reject('Erreur lors de la création du partenaire: ' + error.message);
                                        }
                                    );
                                },
                                (error: any) => {
                                    reject('Erreur lors de la création de l’utilisateur: ' + error.message);
                                }
                            );
                        } else {
                            tx.executeSql(
                                'INSERT INTO Users (name, email, password) VALUES (?, ?, ?);',
                                [name, email, password],
                                (tx: any, userResults: any) => {
                                    const userId = userResults.insertId; // Récupérer l'ID de l'utilisateur inséré

                                    // Insérer un enregistrement dans la table Partner en utilisant l'userId
                                    tx.executeSql(
                                        'INSERT INTO Partners (id, phone, role, mobile, address, user_id) VALUES (?, ?, ?, ?, ?, ?);',
                                        [partner_id, phone, role, mobile, address, userId],
                                        () => {
                                            resolve('Utilisateur et partenaire créés avec succès');
                                        },
                                        (error: any) => {
                                            reject('Erreur lors de la création du partenaire: ' + error.message);
                                        }
                                    );
                                },
                                (error: any) => {
                                    reject('Erreur lors de la création de l’utilisateur: ' + error.message);
                                }
                            );
                        }

                    }
                },
                (error: any) => {
                    reject('Erreur lors de la vérification de l’email: ' + error.message);
                }
            );
        });
    });
};


export const getdata = (tableName: any) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
            tx.executeSql(
                `SELECT * FROM ${tableName};`,
                [],
                (tx: any, results: any) => {
                    let users = [];
                    let len = results.rows.length;
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let user = results.rows.item(i);
                            users.push(user);  // Ajouter l'utilisateur au tableau
                        }
                    }
                    resolve(({ data: users, success: true }));  // Résoudre la promesse avec le tableau d'utilisateurs
                },
                (error: any) => {
                    resolve({ ...error, success: false });  // Rejeter la promesse en cas d'erreur
                }
            );
        });
    });
};


export const getEventRegistrationData = (event_id: any) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
            tx.executeSql(
                `SELECT * FROM event_registration WHERE event_id=? ;`,
                [event_id],
                (tx: any, results: any) => {
                    let users = [];
                    let len = results.rows.length;
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let user = results.rows.item(i);
                            users.push(user);
                        }
                    }
                    resolve(({ data: users, success: true }));
                },
                (error: any) => {
                    resolve({ ...error, success: false });
                }
            );
        });
    });
};
export const getEventTiketData = (event_id: any) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
            tx.executeSql(
                `SELECT * FROM Tickets  WHERE event_id=?;`,
                [event_id],
                (tx: any, results: any) => {
                    let users = [];
                    let len = results.rows.length;
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let user = results.rows.item(i);
                            users.push(user);
                        }
                    }
                    resolve(({ data: users, success: true }));
                },
                (error: any) => {
                    resolve({ ...error, success: false });
                }
            );
        });
    });
};
export const getEventRegistrationByQRCode = (qrcode: any) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
            tx.executeSql(
                `SELECT * FROM event_registration WHERE barcode = ?;;`,
                [qrcode],
                (tx: any, results: any) => {
                    let users = [];
                    let len = results.rows.length;
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let user = results.rows.item(i);
                            users.push(user);
                        }
                    }
                    resolve(({ data: users, success: true }));
                },
                (error: any) => {
                    resolve({ ...error, success: false });
                }
            );
        });
    });
};
export const updateEventRegistration = (id: any) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
            tx.executeSql(
                `UPDATE event_registration SET state = ? WHERE id = ?;`,
                ['done', id],
                (tx: any, results: any) => {
                    if (results.rowsAffected > 0) {
                        resolve({ success: true, message: 'Enregistrement mis à jour avec succès.' });
                    } else {
                        resolve({ success: false, message: 'Aucun enregistrement trouvé avec ce code-barres.' });
                    }
                },
                (error: any) => {
                    resolve({ success: false, message: 'Erreur lors de la mise à jour de l\'enregistrement.', error });
                }
            );
        });
    });
};
