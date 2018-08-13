select
t.matchsource,
t.matchseq,
t.matchid,
t.mapid,
round((t.time/1000)*2)/2 as time,
t.p_date,
t.bnetid,
t.heroid,
t.teamid,
-- t.eventtype,
-- t.roletype,
avg(t.pos_x) as pos_x,
avg(t.pos_y) as pos_y,
avg(t.pos_z) as pos_z
-- max(t.amount) as amount

from

(
    select
    -- matches
    eventinfo.instanceid.src as matchsource,
    eventinfo.instanceid.seq as matchseq,
    concat(
    cast(eventinfo.instanceid.src as string),'|',
    cast(eventinfo.instanceid.seq as string)
    ) as matchid,
    -- map
    eventinfo.mapid as mapid,
    -- time
    eventinfo.gametimems as time,
    p_date,
    -- actor
    shooter.baseplayer.bnetid as bnetid,
    shooter.hero as heroid,
    shooter.team as teamid,
    -- meta
    'damage' as eventtype,
    'giver' as roletype,
    -- position
    shooter.heroposition.position.x as pos_x,
    shooter.heroposition.position.y as pos_y,
    shooter.heroposition.position.z as pos_z,
    amount as amount

    from pro.bieventdamagedealt

    where
    eventinfo.mapid = 576460752303425133 and
    p_date in (20160327, 20160326) and
    shooter.heroposition.position.z <= -130 and
    (
    eventinfo.instanceid.seq = 8890167282009964556
    and
    eventinfo.instanceid.src = 134726424521015543
    )

    union all

    select
    -- matches
    eventinfo.instanceid.src as matchsource,
    eventinfo.instanceid.seq as matchseq,
    concat(
    cast(eventinfo.instanceid.src as string),'|',
    cast(eventinfo.instanceid.seq as string)
    ) as matchid,
    -- map
    eventinfo.mapid as mapid,
    -- time
    eventinfo.gametimems as time,
    p_date,
    -- actor
    victim.baseplayer.bnetid as bnetid,
    victim.hero as heroid,
    victim.team as teamid,
    -- meta
    'damage' as eventtype,
    'receiver' as roletype,
    -- position
    victim.heroposition.position.x as pos_x,
    victim.heroposition.position.y as pos_y,
    victim.heroposition.position.z as pos_z,
    amount as amount

    from pro.bieventdamagedealt

    where
    eventinfo.mapid = 576460752303425133 and
    p_date in (20160327, 20160326) and
    victim.heroposition.position.z <= -130 and
    (
    eventinfo.instanceid.seq = 8890167282009964556
    and
    eventinfo.instanceid.src = 134726424521015543
    )

    union all

    select
    -- matches
    eventinfo.instanceid.src as matchsource,
    eventinfo.instanceid.seq as matchseq,
    concat(
    cast(eventinfo.instanceid.src as string),'|',
    cast(eventinfo.instanceid.seq as string)
    ) as matchid,
    -- map
    eventinfo.mapid as mapid,
    -- time
    eventinfo.gametimems as time,
    p_date,
    -- actor
    healer.baseplayer.bnetid as bnetid,
    healer.hero as heroid,
    healer.team as teamid,
    -- meta
    'healing' as eventtype,
    'giver' as roletype,
    -- position
    healer.heroposition.position.x as pos_x,
    healer.heroposition.position.y as pos_y,
    healer.heroposition.position.z as pos_z,
    amount as amount

    from pro.bieventhealingdone

    where
    eventinfo.mapid = 576460752303425133 and
    p_date in (20160327, 20160326) and
    healer.heroposition.position.z <= -130 and
    (
    eventinfo.instanceid.seq = 8890167282009964556
    and
    eventinfo.instanceid.src = 134726424521015543
    )

    union all

    select
    -- matches
    eventinfo.instanceid.src as matchsource,
    eventinfo.instanceid.seq as matchseq,
    concat(
    cast(eventinfo.instanceid.src as string),'|',
    cast(eventinfo.instanceid.seq as string)
    ) as matchid,
    -- map
    eventinfo.mapid as mapid,
    -- time
    eventinfo.gametimems as time,
    p_date,
    -- actor
    patient.baseplayer.bnetid as bnetid,
    patient.hero as heroid,
    patient.team as teamid,
    -- meta
    'healing' as eventtype,
    'receiver' as roletype,
    -- position
    patient.heroposition.position.x as pos_x,
    patient.heroposition.position.y as pos_y,
    patient.heroposition.position.z as pos_z,
    amount as amount

    from pro.bieventhealingdone

    where
    eventinfo.mapid = 576460752303425133 and
    p_date in (20160327, 20160326) and
    patient.heroposition.position.z <= -130 and
    (
    eventinfo.instanceid.seq = 8890167282009964556
    and
    eventinfo.instanceid.src = 134726424521015543
    )

    union all

    select
    -- matches
    eventinfo.instanceid.src as matchsource,
    eventinfo.instanceid.seq as matchseq,
    concat(
    cast(eventinfo.instanceid.src as string),'|',
    cast(eventinfo.instanceid.seq as string)
    ) as matchid,
    -- map
    eventinfo.mapid as mapid,
    -- time
    eventinfo.gametimems as time,
    p_date,
    -- actor
    player.baseplayer.bnetid as bnetid,
    player.hero as heroid,
    player.team as teamid,
    -- meta
    'healthpack' as eventtype,
    'receiver' as roletype,
    -- position
    player.heroposition.position.x as pos_x,
    player.heroposition.position.y as pos_y,
    player.heroposition.position.z as pos_z,
    healedamount as amount

    from pro.bieventhealthpackpickup

    where
    eventinfo.mapid = 576460752303425133 and
    p_date in (20160327, 20160326) and
    player.heroposition.position.z <= -130 and
    (
    eventinfo.instanceid.seq = 8890167282009964556
    and
    eventinfo.instanceid.src = 134726424521015543
    )

    union all

    select
    -- matches
    eventinfo.instanceid.src as matchsource,
    eventinfo.instanceid.seq as matchseq,
    concat(
    cast(eventinfo.instanceid.src as string),'|',
    cast(eventinfo.instanceid.seq as string)
    ) as matchid,
    -- map
    eventinfo.mapid as mapid,
    -- time
    eventinfo.gametimems as time,
    p_date,
    -- actor
    killer.baseplayer.baseplayer.bnetid as bnetid,
    killer.baseplayer.hero as heroid,
    killer.baseplayer.team as teamid,
    -- meta
    'kill' as eventtype,
    'giver' as roletype,
    -- position
    killer.baseplayer.heroposition.position.x as pos_x,
    killer.baseplayer.heroposition.position.y as pos_y,
    killer.baseplayer.heroposition.position.z as pos_z,
    1 as amount

    from pro.bieventkill

    where
    eventinfo.mapid = 576460752303425133 and
    p_date in (20160327, 20160326) and
    killer.baseplayer.heroposition.position.z <= -130 and
    (
    eventinfo.instanceid.seq = 8890167282009964556
    and
    eventinfo.instanceid.src = 134726424521015543
    )

    union all

    select
    -- matches
    eventinfo.instanceid.src as matchsource,
    eventinfo.instanceid.seq as matchseq,
    concat(
    cast(eventinfo.instanceid.src as string),'|',
    cast(eventinfo.instanceid.seq as string)
    ) as matchid,
    -- map
    eventinfo.mapid as mapid,
    -- time
    eventinfo.gametimems as time,
    p_date,
    -- actor
    victim.baseplayer.bnetid as bnetid,
    victim.hero as heroid,
    victim.team as teamid,
    -- meta
    'kill' as eventtype,
    'receiver' as roletype,
    -- position
    victim.heroposition.position.x as pos_x,
    victim.heroposition.position.y as pos_y,
    victim.heroposition.position.z as pos_z,
    1 as amount

    from pro.bieventkill
    
    where
    eventinfo.mapid = 576460752303425133 and
    p_date in (20160327, 20160326) and
    victim.heroposition.position.z <= -130 and
    (
    eventinfo.instanceid.seq = 8890167282009964556
    and
    eventinfo.instanceid.src = 134726424521015543
    )

    union all

    select
    -- matches
    eventinfo.instanceid.src as matchsource,
    eventinfo.instanceid.seq as matchseq,
    concat(
    cast(eventinfo.instanceid.src as string),'|',
    cast(eventinfo.instanceid.seq as string)
    ) as matchid,
    -- map
    eventinfo.mapid as mapid,
    -- time
    eventinfo.gametimems as time,
    p_date,
    -- actor
    player.baseplayer.bnetid as bnetid,
    player.hero as heroid,
    player.team as teamid,
    -- meta
    'spawn' as eventtype,
    'receiver' as roletype,
    -- position
    player.heroposition.position.x as pos_x,
    player.heroposition.position.y as pos_y,
    player.heroposition.position.z as pos_z,
    1 as amount

    from pro.bieventspawn

    where
    eventinfo.mapid = 576460752303425133 and
    p_date in (20160327, 20160326) and
    player.heroposition.position.z <= -130 and
    (
    eventinfo.instanceid.seq = 8890167282009964556
    and
    eventinfo.instanceid.src = 134726424521015543
    )

) t
group by 1,2,3,4,5,6,7,8,9
