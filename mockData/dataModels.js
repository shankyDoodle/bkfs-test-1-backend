let customerData = {
    black_knight:
        {
            'Appraisal Report': 'Appraisal Report',
            'Automated Underwriting Feedback - DU Codified Findings': 'Automated Underwriting Feedback - DU Codified Findings',
            'Closing Disclosure': 'CD',
            'Credit Report': 'Credit Reports',
            'Security Intrument Rider - ARM': 'SIARM'
        },
    google:
        {
            'Appraisal Report': 'Appraisal Report',
            'Automated Underwriting Feedback - DU Codified Findings': 'Automated Underwriting Feedback - DU Codified Findings',
            'Closing Disclosure': 'Closing Disclosure',
            'Credit Report': 'Credit Reports',
            'Security Intrument Rider - ARM': 'SecurityIntrumentRider-ARM',
            'Pay Stub': 'Pay Stubs',
            W2: 'Form W2'
        },
    heavywater:
        {
            'Appraisal Report': 'Appraisal Report',
            'Automated Underwriting Feedback - DU Codified Findings': 'Automated Underwriting Feedback - DU Codified Findings',
            'Closing Disclosure': 'Closing Disclosure',
            'Credit Report': 'Credit Reports',
            'Security Intrument Rider - ARM': 'SecurityIntrumentRider-ARM',
            'Pay Stub': 'Pay Stubs',
            W2: 'Form W2'
        },
    yahoo:
        {
            'Appraisal Report': 'Appraisal Report',
            'Automated Underwriting Feedback - DU Codified Findings': 'DU',
            'Credit Report': 'Credit Report',
            'Security Intrument Rider - ARM': 'SI-ARM',
            'Pay Stub': 'Pay Stub',
            W2: 'W2'
        },
    we_bank:
        {
            'Appraisal Report': 'Appraisal Report',
            'Automated Underwriting Feedback - DU Codified Findings': 'Automated Underwriting Feedback - DU Codified Findings',
            'Closing Disclosure': 'Closing Disclosure',
            'Credit Report': 'Credit Reports',
            'Security Intrument Rider - ARM': 'SecurityIntrumentRider-ARM'
        }
}

let customerList = {
    black_knight:
        {
            id: 'black_knight',
            label: 'Black Knight',
            fileLocation: 'classifications/BlackKnight.csv'
        },
    google:
        {
            id: 'google',
            label: 'Google',
            fileLocation: 'classifications/Google.csv'
        },
    heavywater:
        {
            id: 'heavywater',
            label: 'Heavywater',
            fileLocation: 'classifications/HeavyWater.csv'
        },
    yahoo:
        {
            id: 'yahoo',
            label: 'Yahoo',
            fileLocation: 'classifications/Yahoo.csv'
        },
    we_bank:
        {
            id: 'we_bank',
            label: 'We Bank',
            fileLocation: 'classifications/WeBank.csv'
        }
}

let orig = {
    black_knight:
        [{
            'Document Type': 'Appraisal Report',
            'Customer Document Type': 'Appraisal Report'
        },
            {
                'Document Type': 'Automated Underwriting Feedback - DU Codified Findings',
                'Customer Document Type': 'Automated Underwriting Feedback - DU Codified Findings'
            },
            {
                'Document Type': 'Closing Disclosure',
                'Customer Document Type': 'CD'
            },
            {
                'Document Type': 'Credit Report',
                'Customer Document Type': 'Credit Reports'
            },
            {
                'Document Type': 'Security Intrument Rider - ARM',
                'Customer Document Type': 'SIARM'
            }],
    google:
        [{
            'Document Type': 'Appraisal Report',
            'Customer Document Type': 'Appraisal Report'
        },
            {
                'Document Type': 'Automated Underwriting Feedback - DU Codified Findings',
                'Customer Document Type': 'Automated Underwriting Feedback - DU Codified Findings'
            },
            {
                'Document Type': 'Closing Disclosure',
                'Customer Document Type': 'Closing Disclosure'
            },
            {
                'Document Type': 'Credit Report',
                'Customer Document Type': 'Credit Reports'
            },
            {
                'Document Type': 'Security Intrument Rider - ARM',
                'Customer Document Type': 'SecurityIntrumentRider-ARM'
            },
            {
                'Document Type': 'Pay Stub',
                'Customer Document Type': 'Pay Stubs'
            },
            {'Document Type': 'W2', 'Customer Document Type': 'Form W2'}],
    heavywater:
        [{
            'Document Type': 'Appraisal Report',
            'Customer Document Type': 'Appraisal Report'
        },
            {
                'Document Type': 'Automated Underwriting Feedback - DU Codified Findings',
                'Customer Document Type': 'Automated Underwriting Feedback - DU Codified Findings'
            },
            {
                'Document Type': 'Closing Disclosure',
                'Customer Document Type': 'Closing Disclosure'
            },
            {
                'Document Type': 'Credit Report',
                'Customer Document Type': 'Credit Reports'
            },
            {
                'Document Type': 'Security Intrument Rider - ARM',
                'Customer Document Type': 'SecurityIntrumentRider-ARM'
            },
            {
                'Document Type': 'Pay Stub',
                'Customer Document Type': 'Pay Stubs'
            },
            {'Document Type': 'W2', 'Customer Document Type': 'Form W2'}],
    yahoo:
        [{
            'Document Type': 'Appraisal Report',
            'Customer Document Type': 'Appraisal Report'
        },
            {
                'Document Type': 'Automated Underwriting Feedback - DU Codified Findings',
                'Customer Document Type': 'DU'
            },
            {
                'Document Type': 'Credit Report',
                'Customer Document Type': 'Credit Report'
            },
            {
                'Document Type': 'Security Intrument Rider - ARM',
                'Customer Document Type': 'SI-ARM'
            },
            {
                'Document Type': 'Pay Stub',
                'Customer Document Type': 'Pay Stub'
            },
            {'Document Type': 'W2', 'Customer Document Type': 'W2'}],
    we_bank:
        [{
            'Document Type': 'Appraisal Report',
            'Customer Document Type': 'Appraisal Report'
        },
            {
                'Document Type': 'Automated Underwriting Feedback - DU Codified Findings',
                'Customer Document Type': 'Automated Underwriting Feedback - DU Codified Findings'
            },
            {
                'Document Type': 'Closing Disclosure',
                'Customer Document Type': 'Closing Disclosure'
            },
            {
                'Document Type': 'Credit Report',
                'Customer Document Type': 'Credit Reports'
            },
            {
                'Document Type': 'Security Intrument Rider - ARM',
                'Customer Document Type': 'SecurityIntrumentRider-ARM'
            }]
}


let documentSamples = {
    'security_intrument_rider_-_arm':"sjsdhfgjshdfgahsgfkjhsdgfhjsdgfsjhfgjhsd"
}

let groupElements = { appraisal_report:
        [ { groupId: '1', dataElements: [Array] },
            { groupId: '4', dataElements: [Array] },
            { groupId: '5', dataElements: [Array] },
            { groupId: '36', dataElements: [Array] },
            { groupId: '100', dataElements: [Array] } ],
    'automated_underwriting_feedback_-_du_codified_findings':
        [ { groupId: '1', dataElements: [Array] },
            { groupId: '3', dataElements: [Array] },
            { groupId: '4', dataElements: [Array] },
            { groupId: '7', dataElements: [Array] },
            { groupId: '8', dataElements: [Array] },
            { groupId: '9', dataElements: [Array] },
            { groupId: '12', dataElements: [Array] },
            { groupId: '17', dataElements: [Array] },
            { groupId: '23', dataElements: [Array] },
            { groupId: '24', dataElements: [Array] },
            { groupId: '25', dataElements: [Array] },
            { groupId: '37', dataElements: [Array] },
            { groupId: '72', dataElements: [Array] } ],
    closing_disclosure:
        [ { groupId: '1', dataElements: [Array] },
            { groupId: '2', dataElements: [Array] },
            { groupId: '3', dataElements: [Array] },
            { groupId: '4', dataElements: [Array] },
            { groupId: '5', dataElements: [Array] },
            { groupId: '6', dataElements: [Array] },
            { groupId: '7', dataElements: [Array] },
            { groupId: '8', dataElements: [Array] },
            { groupId: '9', dataElements: [Array] },
            { groupId: '10', dataElements: [Array] } ],
    credit_report:
        [ { groupId: '1', dataElements: [Array] },
            { groupId: '2', dataElements: [Array] },
            { groupId: '74', dataElements: [Array] } ],
    'security_intrument_rider_-_arm': [],
    pay_stub:
        [ { groupId: '1', dataElements: [Array] },
            { groupId: '2', dataElements: [Array] },
            { groupId: '3', dataElements: [Array] },
            { groupId: '4', dataElements: [Array] },
            { groupId: '5', dataElements: [Array] },
            { groupId: '6', dataElements: [Array] },
            { groupId: '7', dataElements: [Array] },
            { groupId: '8', dataElements: [Array] } ],
    w2:
        [ { groupId: '1', dataElements: [Array] },
            { groupId: '2', dataElements: [Array] },
            { groupId: '3', dataElements: [Array] },
            { groupId: '4', dataElements: [Array] },
            { groupId: '5', dataElements: [Array] },
            { groupId: 'TIPS', dataElements: [Array] } ]
}

let docTypes = {
    appraisal_report:
        {
            id: 'appraisal_report',
            label: 'Appraisal Report',
            fileLocation: 'samples/Appraisal Report.pdf'
        },
    'automated_underwriting_feedback_-_du_codified_findings':
        {
            id: 'automated_underwriting_feedback_-_du_codified_findings',
            label: 'Automated Underwriting Feedback - DU Codified Findings',
            fileLocation:
                'samples/Automated Underwriting Feedback - DU Codified Findings.pdf'
        },
    closing_disclosure:
        {
            id: 'closing_disclosure',
            label: 'Closing Disclosure',
            fileLocation: 'samples/Closing Disclosure.pdf'
        },
    credit_report:
        {
            id: 'credit_report',
            label: 'Credit Report',
            fileLocation: 'samples/Credit Report.pdf'
        },
    'security_intrument_rider_-_arm':
        {
            id: 'security_intrument_rider_-_arm',
            label: 'Security Intrument Rider - ARM',
            fileLocation: 'samples/Security Intrument Rider - ARM.pdf'
        },
    pay_stub: {id: 'pay_stub', label: 'Pay Stub', fileLocation: ''},
    w2: {id: 'w2', label: 'W2', fileLocation: ''}
}
