<div ng-controller="TestCtrl">
    <ul class="unstyled">
        <li ng-repeat="project in projects">
            <span>{{project.attributes.title}}</span>
        </li>
    </ul>
</div>
