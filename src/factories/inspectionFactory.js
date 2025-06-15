export function createDamageItem() {
    return {
        id: Date.now(), // The ID should be determined by the backend, but since we're using a fake database, we can use the current timestamp to create a unique ID
        location: '',
        new: true,
        type: 'normal',
        date: new Date().toISOString().slice(0, 10), // default to today
        urgent: false,
        description: '',
        photos: []
    };
}

export function createMaintenanceItem() {
    return {
        id: Date.now(),
        location: '',
        type: '',
        urgent: false,
        costIndication: '',
        photos: []
    };
}

export function createInstallationItem() {
    return {
        id: Date.now(),
        location: '',
        type: '',
        fault: '',
        procedure: '',
        approved: false,
        comments: '',
        photos: []
    };
}

export function createModificationItem() {
    return {
        id: Date.now(),
        situation: '',
        location: '',
        doneBy: '',
        description: '',
        action: '',
        comments: '',
        photos: []
    };
}