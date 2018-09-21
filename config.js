global.dbinfo = {
    mongohost: "localhost",
    dbname: "bulkjobs"
};
global.port = 8787;
global.bulkjobfrequency = {
    0: "Daily",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thurs",
    5: "Fri",
    6: "Sat",
    7: "Sun"
};
global.masterKey = {
    Name: "BulkJobName",
    id: "BulkJobId",
    Type: "BulkJobType",
    CSST: "CookingScheduledStartTime",
    CSET: "CookingScheduledEndTime",
    SSST: "SendingScheduledStartTime",
    SSET: "SendingScheduledEndTime",
    SEST: "SendingExpectedStartTime",
    SEET: "SendingExpectedEndTime",
    CEST: "CookingExpectedStartTime",
    CEET: "CookingExpectedEndTime",
    CFN: "CookingFileName",
    CI: "CookingInstance",
    SFN: "SendingFileName",
    SI: "SendingInstance",
    BJF: "BulkJobFrequency",
    BJD: "BulkJobDays",
    DS: "Description"
};
global.masterNestedKey = {
    CH: "CookingHost",
    SH: "SendingHost",
    CS: "CookingSource",
    SS: "SendingSource",
    CII: "CookingInstanceInfo",
    SII: "SendingInstanceInfo"
};
global.arrmailerLogSort = ['Date', 'TotalSent', 'TotalCooked', 'CookingStartTime', 'CookingEndTime', 'CookedDuration', 'SendingStartTime', 'SendingEndTime', 'SendingDuration', 'Cooked', 'Sent'];
global.days = {
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thurs',
    5: 'Fri',
    6: 'Sat',
    7: 'Sun'
};