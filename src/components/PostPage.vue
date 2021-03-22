<template>
<div>
    posts {{id}}
    Query paramas :<br>
    Q :{{ $route.query.q }}
    <br/>
     Name :{{ $route.query.name }}
</div>
    
</template>

<script>
export default {

    props :["id"]
    
}
</script>